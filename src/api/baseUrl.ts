// Cast to any or a Record to avoid TypeScript "property does not exist" errors 
// if they are not defined in a vite-env.d.ts file.
const env = import.meta.env as Record<string, string | undefined>;

const fromEnv = env?.VITE_API_URL?.trim();
const fromPort = env?.VITE_API_PORT?.trim();

const fromWindow =
  fromPort
    ? `${window.location.protocol}//${window.location.hostname}:${fromPort}/api`
    : `${window.location.origin}/api`;

const rawUrl = fromEnv || fromWindow;

// Ensure no trailing slash to prevent double-slashes when used as `${API_BASE_URL}/endpoint`
export const API_BASE_URL = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;
