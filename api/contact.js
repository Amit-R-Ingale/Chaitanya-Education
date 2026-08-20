const ALLOWED_INQUIRY_TYPES = new Set([
  'admission',
  'fees',
  'curriculum',
  'facilities',
  'transfer',
  'general',
]);

const ALLOWED_GRADES = new Set([
  'pre-primary',
  'primary',
  'middle',
  'high',
  'ITI',
]);

const FIELD_LIMITS = {
  inquiryType: 40,
  name: 100,
  email: 254,
  phone: 20,
  grade: 40,
  message: 2000,
};

const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const DUPLICATE_WINDOW_MS = 10 * 60_000;
const recentSubmissions = new Map();

function json(res, status, payload) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(payload);
}

function getClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim().slice(0, 64);
  }
  return String(req.headers?.['x-real-ip'] || 'unknown').slice(0, 64);
}

function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

function isValidPhone(phone) {
  // The existing frontend uses a 10-digit phone pattern.
  return /^[0-9]{10}$/.test(phone);
}

function cleanupStores(now) {
  for (const [key, value] of rateLimitStore) {
    if (now - value.startedAt > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(key);
  }
  for (const [key, timestamp] of recentSubmissions) {
    if (now - timestamp > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
  }
}

function isRateLimited(ip, now) {
  const current = rateLimitStore.get(ip);

  if (!current || now - current.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function duplicateKey(data) {
  return [
    data.inquiryType,
    data.name.toLowerCase(),
    data.email.toLowerCase(),
    data.phone,
    data.grade,
    data.message.toLowerCase(),
  ].join('|');
}

function parseJsonBody(req) {
  if (!req.body) return null;
  if (typeof req.body === 'object') return req.body;
  if (typeof req.body !== 'string') return null;

  try {
    return JSON.parse(req.body);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  const contentType = String(req.headers?.['content-type'] || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return json(res, 415, {
      success: false,
      message: 'Unsupported request format',
    });
  }

  const now = Date.now();
  cleanupStores(now);

  const ip = getClientIp(req);
  if (isRateLimited(ip, now)) {
    return json(res, 429, {
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }

  const body = parseJsonBody(req);
  if (!body || Array.isArray(body)) {
    return json(res, 400, {
      success: false,
      message: 'Invalid form submission.',
    });
  }

  const data = {
    inquiryType: sanitizeText(body.inquiryType, FIELD_LIMITS.inquiryType),
    name: sanitizeText(body.name, FIELD_LIMITS.name),
    email: sanitizeText(body.email, FIELD_LIMITS.email).toLowerCase(),
    phone: sanitizeText(body.phone, FIELD_LIMITS.phone).replace(/\s+/g, ''),
    grade: sanitizeText(body.grade, FIELD_LIMITS.grade),
    message: sanitizeText(body.message, FIELD_LIMITS.message),
  };

  if (!data.inquiryType || !data.name || !data.phone || !data.grade) {
    return json(res, 400, {
      success: false,
      message: 'Please fill in all required fields.',
    });
  }

  if (!ALLOWED_INQUIRY_TYPES.has(data.inquiryType)) {
    return json(res, 400, {
      success: false,
      message: 'Invalid enquiry type.',
    });
  }

  if (!ALLOWED_GRADES.has(data.grade)) {
    return json(res, 400, {
      success: false,
      message: 'Invalid grade selection.',
    });
  }

  if (!isValidEmail(data.email)) {
    return json(res, 400, {
      success: false,
      message: 'Please enter a valid email address.',
    });
  }

  if (!isValidPhone(data.phone)) {
    return json(res, 400, {
      success: false,
      message: 'Please enter a valid 10-digit phone number.',
    });
  }

  const key = duplicateKey(data);
  const previousSubmission = recentSubmissions.get(key);
  if (previousSubmission && now - previousSubmission < DUPLICATE_WINDOW_MS) {
    return json(res, 409, {
      success: false,
      message: 'This enquiry was already submitted recently.',
    });
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const apiSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!appsScriptUrl || !apiSecret) {
    console.error('Google Apps Script configuration is missing.');
    return json(res, 500, {
      success: false,
      message: 'Sorry, we could not submit your enquiry right now. Please try again later.',
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    let upstreamResponse;
    try {
      upstreamResponse = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Contact-Secret': apiSecret,
        },
        body: JSON.stringify({ ...data, _secret: apiSecret }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const upstreamText = await upstreamResponse.text();
    let upstreamResult = null;

    try {
      upstreamResult = JSON.parse(upstreamText);
    } catch {
      upstreamResult = null;
    }

    if (!upstreamResponse.ok || !upstreamResult?.success) {
      console.error('Google Apps Script submission failed:', {
        status: upstreamResponse.status,
        result: upstreamResult?.message || 'Unexpected upstream response',
      });

      const status = upstreamResponse.status === 400 ? 400 : 500;
      return json(res, status, {
        success: false,
        message: status === 400
          ? 'Please check your enquiry details and try again.'
          : 'Sorry, we could not submit your enquiry right now. Please try again later.',
      });
    }

    recentSubmissions.set(key, now);

    return json(res, 200, {
      success: true,
      message: 'Enquiry submitted successfully.',
    });
  } catch (error) {
    console.error('Error in /api/contact:', error?.name || 'Unknown error');

    return json(res, 500, {
      success: false,
      message: 'Sorry, we could not submit your enquiry right now. Please try again later.',
    });
  }
}
