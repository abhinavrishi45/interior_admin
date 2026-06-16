// Simple cookie-based auth utilities (no external dependencies)
const AUTH_COOKIE = "admin_auth";

export function setAuthCookie(email: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(email)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
}

export function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getAuthFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// Mock credentials — replace with real API call in production
export const MOCK_CREDENTIALS = {
  email: "admin@example.com",
  password: "password123",
};
