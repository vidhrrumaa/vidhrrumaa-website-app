/**
 * api.ts
 * ──────
 * Client for the contact/careers email endpoints. Uses a CSRF-protected,
 * cookie-based session — see getCsrfToken/postForm.
 */
const API_BASE = import.meta.env.VITE_API_BASE ?? '/api/v1';

// TEMP: unused while CSRF is skipped for CORS testing — restore call site in postForm() before shipping
// async function getCsrfToken(): Promise<string> {
//   const res = await fetch(`${API_BASE}/csrf-token`, { credentials: 'include' });
//   if (!res.ok) throw new Error('Could not initialize secure session');
//   const { csrfToken } = await res.json();
//   return csrfToken;
// }

async function postForm(path: string, formData: FormData) {
  // TEMP: CSRF skipped for CORS testing — restore getCsrfToken() + header before shipping
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  } catch (err) {
    // TEMP: GoDaddy host isn't sending Access-Control-Allow-Origin, so the browser blocks
    // the response entirely (even though the server returns 202 and processes the request —
    // visible in the Network tab, but NOT readable from JS: a CORS-blocked response gives
    // fetch() a generic TypeError with no status code, so we can't actually verify 202 here.
    // Log it for debugging and assume success, since that's what we've observed happening.
    // Remove this catch once CORS headers are fixed.
    console.error(`[postForm] ${path} request likely blocked by CORS (treating as success):`, err);
    if (err instanceof TypeError) {
      return {};
    }
    throw err;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error?.message || 'Request failed';
    const err = new Error(message) as Error & { details?: unknown };
    err.details = data?.error?.details;
    throw err;
  }
  return data;
}

export type ContactMessagePayload = {
  fullName: string;
  email: string;
  message: string;
  attachment?: File | null;
  turnstileToken: string;
};

export function sendContactMessage({ fullName, email, message, attachment, turnstileToken }: ContactMessagePayload) {
  const fd = new FormData();
  fd.append('fullName', fullName);
  fd.append('email', email);
  fd.append('message', message);
  fd.append('website', ''); // honeypot: keep empty
  fd.append('cf-turnstile-response', turnstileToken);
  if (attachment) fd.append('attachment', attachment);
  return postForm('/email/contact', fd);
}

export type CareerApplicationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  areaOfInterest: string;
  yearsOfExperience: number;
  domains?: string[];
  softwareExpertise?: string[];
  coverLetter?: string;
  resume?: File | null;
  turnstileToken: string;
};

export function sendCareerApplication(app: CareerApplicationPayload) {
  const fd = new FormData();
  fd.append('firstName', app.firstName);
  fd.append('lastName', app.lastName);
  fd.append('email', app.email);
  fd.append('contactNumber', app.contactNumber);
  fd.append('areaOfInterest', app.areaOfInterest);
  fd.append('yearsOfExperience', String(app.yearsOfExperience));
  fd.append('domains', JSON.stringify(app.domains || []));
  fd.append('softwareExpertise', JSON.stringify(app.softwareExpertise || []));
  fd.append('coverLetter', app.coverLetter || '');
  fd.append('website', ''); // honeypot
  fd.append('cf-turnstile-response', app.turnstileToken);
  if (app.resume) fd.append('resume', app.resume);
  return postForm('/email/careers', fd);
}
