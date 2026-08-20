/**
 * Chaitanya Education - Google Sheets + email integration
 *
 * Deploy this file as a Google Apps Script Web App.
 * Store the following values in Project Settings -> Script Properties:
 *
 * API_SECRET       - long random secret shared only with Vercel
 * SPREADSHEET_ID   - ID of the Google Sheet used for enquiries
 * SHEET_NAME       - optional, defaults to "Enquiries"
 * SCHOOL_EMAIL     - school email address that should receive notifications
 */

const REQUIRED_PROPERTIES = [
  'API_SECRET',
  'SPREADSHEET_ID',
  'SCHOOL_EMAIL',
];

const FIELD_LIMITS = {
  inquiryType: 40,
  name: 100,
  email: 254,
  phone: 20,
  grade: 40,
  message: 2000,
};

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

function doGet() {
  return jsonResponse_({
    success: true,
    service: 'Chaitanya Education enquiry endpoint',
  });
}

function doPost(e) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty('API_SECRET');

    if (!expectedSecret || !e || !e.postData || !e.postData.contents) {
      return jsonResponse_({
        success: false,
        message: 'Service is not configured.',
      }, 500);
    }

    let body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (error) {
      return jsonResponse_({
        success: false,
        message: 'Invalid JSON request.',
      }, 400);
    }

    const suppliedSecret = String(body._secret || '');

    if (!safeEqual_(suppliedSecret, String(expectedSecret))) {
      return jsonResponse_({
        success: false,
        message: 'Unauthorized request.',
      }, 401);
    }

    // Never persist the internal shared secret as part of the enquiry.
    delete body._secret;

    const data = validateAndSanitize_(body);

    // Prevent two identical requests arriving at nearly the same time.
    const lock = LockService.getScriptLock();
    lock.waitLock(5000);

    try {
      const cache = CacheService.getScriptCache();
      const duplicateKey = buildDuplicateKey_(data);

      if (cache.get(duplicateKey)) {
        return jsonResponse_({
          success: false,
          message: 'This enquiry was already submitted recently.',
        }, 409);
      }

      const sheetId = properties.getProperty('SPREADSHEET_ID');
      const sheetName = properties.getProperty('SHEET_NAME') || 'Enquiries';
      const schoolEmail = properties.getProperty('SCHOOL_EMAIL');

      if (!sheetId || !schoolEmail) {
        return jsonResponse_({
          success: false,
          message: 'Service is not configured.',
        }, 500);
      }

      const spreadsheet = SpreadsheetApp.openById(sheetId);
      let sheet = spreadsheet.getSheetByName(sheetName);

      if (!sheet) {
        sheet = spreadsheet.insertSheet(sheetName);
      }

      ensureHeader_(sheet);

      const submittedAt = new Date();

      // Exactly one new row is created for each accepted enquiry.
      sheet.appendRow([
        submittedAt,
        data.inquiryType,
        data.name,
        data.email,
        data.phone,
        data.grade,
        data.message,
      ]);

      cache.put(duplicateKey, '1', 600);

      // Email is intentionally sent only after the sheet row is saved.
      try {
        const subject = 'New Admission Enquiry - ' + data.name;

        const plainBody = [
          'New admission enquiry received.',
          '',
          'Inquiry Type: ' + data.inquiryType,
          'Name: ' + data.name,
          'Phone: ' + data.phone,
          'Email: ' + (data.email || 'Not provided'),
          'Grade: ' + data.grade,
          '',
          'Message:',
          data.message || 'No message provided',
          '',
          'Submitted: ' + Utilities.formatDate(
            submittedAt,
            Session.getScriptTimeZone(),
            'dd-MMM-yyyy HH:mm'
          ),
        ].join('\n');

        const htmlBody = [
          '<p><strong>New admission enquiry received.</strong></p>',
          '<p><strong>Inquiry Type:</strong> ' + escapeHtml_(data.inquiryType) + '</p>',
          '<p><strong>Name:</strong> ' + escapeHtml_(data.name) + '</p>',
          '<p><strong>Phone:</strong> ' + escapeHtml_(data.phone) + '</p>',
          '<p><strong>Email:</strong> ' + escapeHtml_(data.email || 'Not provided') + '</p>',
          '<p><strong>Grade:</strong> ' + escapeHtml_(data.grade) + '</p>',
          '<p><strong>Message:</strong><br>' +
            escapeHtml_(data.message || 'No message provided').replace(/\n/g, '<br>') +
          '</p>',
          '<p><strong>Submitted:</strong> ' +
            escapeHtml_(Utilities.formatDate(
              submittedAt,
              Session.getScriptTimeZone(),
              'dd-MMM-yyyy HH:mm'
            )) +
          '</p>',
        ].join('');

        MailApp.sendEmail({
          to: schoolEmail,
          subject: subject,
          body: plainBody,
          htmlBody: htmlBody,
        });
      } catch (emailError) {
        // The enquiry is already safely stored in Sheets.
        console.error('Email notification failed:', emailError);
      }

      return jsonResponse_({
        success: true,
        message: 'Enquiry submitted successfully.',
      });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error('Submission error:', error);

    const message = String(error && error.message || '');
    if (message.indexOf('Invalid') === 0 || message.indexOf('Please ') === 0) {
      return jsonResponse_({
        success: false,
        message: message,
      }, 400);
    }

    return jsonResponse_({
      success: false,
      message: 'Unable to process the enquiry.',
    }, 500);
  }
}

function validateAndSanitize_(body) {
  if (!body || Array.isArray(body) || typeof body !== 'object') {
    throw new Error('Invalid request body.');
  }

  const data = {
    inquiryType: sanitizeText_(body.inquiryType, FIELD_LIMITS.inquiryType),
    name: sanitizeText_(body.name, FIELD_LIMITS.name),
    email: sanitizeText_(body.email, FIELD_LIMITS.email).toLowerCase(),
    phone: sanitizeText_(body.phone, FIELD_LIMITS.phone).replace(/\s+/g, ''),
    grade: sanitizeText_(body.grade, FIELD_LIMITS.grade),
    message: sanitizeText_(body.message, FIELD_LIMITS.message),
  };

  if (!data.inquiryType || !data.name || !data.phone || !data.grade) {
    throw new Error('Please fill in all required fields.');
  }

  if (!ALLOWED_INQUIRY_TYPES.has(data.inquiryType)) {
    throw new Error('Invalid enquiry type.');
  }

  if (!ALLOWED_GRADES.has(data.grade)) {
    throw new Error('Invalid grade selection.');
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(data.email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!/^[0-9]{10}$/.test(data.phone)) {
    throw new Error('Please enter a valid 10-digit phone number.');
  }

  return data;
}

function sanitizeText_(value, maxLength) {
  if (typeof value !== 'string') return '';

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function ensureHeader_(sheet) {
  const headers = [
    'Date/Time',
    'Inquiry Type',
    'Name',
    'Email',
    'Phone',
    'Grade',
    'Message',
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }

  const current = sheet
    .getRange(1, 1, 1, headers.length)
    .getValues()[0];

  const matches = headers.every(function(header, index) {
    return String(current[index] || '') === header;
  });

  if (!matches) {
    throw new Error('Invalid sheet header configuration.');
  }
}

function buildDuplicateKey_(data) {
  const raw = [
    data.inquiryType,
    data.name.toLowerCase(),
    data.email.toLowerCase(),
    data.phone,
    data.grade,
    data.message.toLowerCase(),
  ].join('|');

  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    raw,
    Utilities.Charset.UTF_8
  );

  return 'submission_' + digest.map(function(byte) {
    const value = byte < 0 ? byte + 256 : byte;
    return ('0' + value.toString(16)).slice(-2);
  }).join('');
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function jsonResponse_(payload, statusCode) {
  // Apps Script ContentService does not expose arbitrary HTTP status codes
  // consistently for Web Apps. The Vercel endpoint treats success:false as failure.
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
