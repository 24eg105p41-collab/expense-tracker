const env = import.meta.env as Record<string, string | undefined>;

/** Base URL of the REST API. "/api" works with the Vite proxy (dev) and nginx (Docker). */
export const API_BASE_URL: string = env.VITE_API_URL || '/api';

/** ISO 4217 currency code and locale used for money / date formatting. */
export const CURRENCY: string = env.VITE_CURRENCY || 'INR';
export const LOCALE: string = env.VITE_LOCALE || 'en-IN';
