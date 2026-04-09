import { API_BASE_URL } from "./baseUrl";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  mustChangePassword?: boolean;
  role?: { id?: string; name?: string } | string | null;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
  message?: string;
};

type AuthRequestOptions = {
  endpoint: string;
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
  token?: string;
};

const authRequest = async <T>({
  endpoint,
  method = "POST",
  body,
  token,
}: AuthRequestOptions): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const rawBody = await res.text();
  let payload: T | { message?: string } | null = null;

  if (rawBody) {
    try {
      payload = JSON.parse(rawBody) as T | { message?: string };
    } catch {
      payload = null;
    }
  }

  const errorMessage =
    payload && typeof payload === "object" && "message" in payload
      ? payload.message
      : undefined;

  if (!res.ok) {
    throw new Error(errorMessage || rawBody.trim() || "Authentication request failed");
  }

  return payload as T;
};

export async function login(email: string, password: string) {
  return authRequest<AuthResponse>({
    endpoint: "login",
    body: {
      email: email.trim().toLowerCase(),
      password,
    },
  });
}

export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
    }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message || "Sign up failed");
  }

  return body as AuthResponse;
}

export async function resetPassword(email: string, newPassword: string) {
  const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      newPassword,
    }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message || "Reset password failed");
  }

  return body;
}

export async function getCurrentUser(token: string) {
  return authRequest<AuthUser>({
    endpoint: "me",
    method: "GET",
    token,
  });
}
