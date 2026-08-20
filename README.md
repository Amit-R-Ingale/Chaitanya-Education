# Chaitanya Education

Vite + React school website with a Vercel Serverless Function for the existing enquiry form.

## Architecture

```text
Visitor
  ↓
Existing React enquiry form
  ↓
POST /api/contact
  ↓
Vercel Serverless Function
  ↓
Server-side validation + sanitization + duplicate/rate checks
  ↓
Google Apps Script Web App
  ↓
Google Sheet (one row per accepted enquiry)
  ↓
Email notification to the school
```

The existing frontend design and form markup are intentionally preserved. The existing `handleFormSubmit` already posts to `/api/contact`, so no visual frontend change is required.

## Form fields currently stored

The actual existing form fields were inspected and are:

- Inquiry Type
- Full Name
- Email Address
- Phone Number
- Grade Applying For
- Message

The Google Sheet uses:

`Date/Time | Inquiry Type | Name | Email | Phone | Grade | Message`

## Why Google Apps Script?

For this small, mostly-static site, Google Apps Script keeps the integration simple:

- No MySQL server or separate backend host.
- No Google service-account private key in Vercel or browser code.
- Google Sheets is the enquiry store.
- Google Apps Script can send the notification email after the row is written.
- Vercel only needs the Apps Script URL and a shared secret.

## Environment variables

Create a local `.env` from `.env.example` when needed:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_APPS_SCRIPT_SECRET=your_long_random_secret
VITE_API_URL=
```

### Vercel

Add these variables in the Vercel project:

- `GOOGLE_APPS_SCRIPT_URL`
- `GOOGLE_APPS_SCRIPT_SECRET`

Do not create `VITE_GOOGLE_APPS_SCRIPT_URL` or `VITE_GOOGLE_APPS_SCRIPT_SECRET`. Variables prefixed with `VITE_` are intended for browser-visible frontend configuration.

`VITE_API_URL` is optional. Leave it empty for the deployed site so the browser calls the same-origin `/api/contact`.

Select **Production, Preview, and Development** for the two server variables if you want the same integration in all Vercel environments. If you use separate Google Sheets for testing, use different values per environment.

## Google Sheet setup

1. Create a Google Sheet for enquiries.
2. Copy the spreadsheet ID from the URL. It is the part between `/d/` and `/edit`.
3. The Apps Script can create a sheet tab named `Enquiries` automatically.
4. Keep the first row available for the script to create:

```text
Date/Time | Inquiry Type | Name | Email | Phone | Grade | Message
```

## Google Apps Script setup

1. Open `script.google.com`.
2. Create a new Apps Script project.
3. Copy the contents of `google-apps-script/Code.gs` into the project.
4. Open **Project Settings → Script Properties**.
5. Add:

```text
API_SECRET       = the same long random secret used by GOOGLE_APPS_SCRIPT_SECRET
SPREADSHEET_ID   = your Google Sheet ID
SHEET_NAME       = Enquiries
SCHOOL_EMAIL     = school email that should receive notifications
```

6. Save the properties.
7. In Apps Script, choose **Deploy → New deployment**.
8. Select **Web app**.
9. Set **Execute as** to the account that owns the Sheet.
10. Set access to **Anyone**.
11. Deploy and authorize the requested Google permissions.
12. Copy the Web App URL ending in `/exec`.
13. Put that URL into Vercel as `GOOGLE_APPS_SCRIPT_URL`.

The Web App is public because Vercel must be able to call it, but the request also contains the server-only `API_SECRET`. The secret is never placed in React code.

## Email behavior

The Apps Script:

1. Validates the request.
2. Writes exactly one row to the Google Sheet.
3. Only after the row is written, attempts to send the school notification email.
4. If email delivery fails, the saved enquiry is not lost. The failure is logged in Apps Script and the submission remains in the Sheet.

The email subject is:

```text
New Admission Enquiry - <Name>
```

## Local development

Install dependencies:

```bash
npm install
```

For frontend-only work:

```bash
npm run dev
```

The production Vercel API function is not automatically provided by Vite's development server.

To run the Vercel function locally, install the Vercel CLI and use:

```bash
vercel dev
```

Then open the local URL shown by Vercel.

If you do not want to configure the Google Apps Script locally, you can set `VITE_API_URL` to a deployed Vercel project URL for a controlled test. Do not put the Apps Script secret in any `VITE_*` variable.

## Production deployment

1. Push this project to GitHub.
2. In Vercel, import the repository.
3. Vercel detects the Vite project.
4. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add:
   - `GOOGLE_APPS_SCRIPT_URL`
   - `GOOGLE_APPS_SCRIPT_SECRET`
6. Deploy.
7. Open the production website.
8. Submit a real test enquiry.
9. Verify:
   - The existing success message appears.
   - A single new row appears in Google Sheets.
   - The school receives the notification email.

## Testing API behavior

Expected successful request:

```json
{
  "inquiryType": "admission",
  "name": "Test User",
  "email": "test@example.com",
  "phone": "9876543210",
  "grade": "high",
  "message": "Test enquiry"
}
```

Expected success:

```json
{
  "success": true,
  "message": "Enquiry submitted successfully."
}
```

Invalid or malformed input returns an error response without exposing server credentials.

## Security

The implementation includes:

- Server-side validation.
- Allow-list validation for the actual inquiry and grade values used by the frontend.
- Input sanitization and length limits.
- Email validation.
- 10-digit phone validation matching the existing frontend pattern.
- Basic Vercel instance rate limiting.
- Duplicate-submission protection.
- Google Apps Script duplicate protection using a short-lived cache.
- A server-to-server shared secret.
- Generic visitor-facing server error messages.
- No MySQL credentials.
- No SMTP password.
- No Google service-account private key.
- No Google secret in React/browser code.
- No unauthenticated `/api/submissions` endpoint.

## Files created

- `google-apps-script/Code.gs`
- `vercel.json`

## Files modified

- `api/contact.js` — replaced the MySQL/Gmail implementation with secure Vercel → Google Apps Script forwarding and server-side validation.
- `.env.example` — now contains only the required integration variables.
- `package.json` — removed backend-only dependencies that are no longer needed by the Vercel/React application.

## Files removed

These were legacy MySQL/Express backend artifacts and are no longer part of the requested Vercel architecture:

- `api/submissions.js`
- `server/server.js`
- `server-test.js`
- `test-contact.js`
- `database/schema.sql`
- `db/migrations/001_create_contact_submissions.sql`

The React UI files, CSS, images, translations, routes/sections, and existing form markup were not redesigned or replaced.
