const localApiBaseUrl = import.meta.env.DEV ? 'http://127.0.0.1:5000' : '';

export const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || localApiBaseUrl
).replace(/\/$/, '');

export const apiUrl = (path) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const hasApiBackend = Boolean(API_BASE_URL);

export const useNetlifyForms = (
    import.meta.env.VITE_CONTACT_PROVIDER === 'netlify' ||
    (!import.meta.env.DEV && !hasApiBackend)
);
