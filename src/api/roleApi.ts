import { API_BASE_URL } from "./baseUrl";

export type Permission = {
  id: string;
  name: string;
  description?: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing auth token. Please sign in again.");
  }
  return token;
};

const parseResponseBody = async (res: Response) => {
  const rawBody = await res.text();
  if (!rawBody) return null;
  try {
    return JSON.parse(rawBody);
  } catch {
    return null;
  }
};

const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });

  const body = await parseResponseBody(res);

  if (!res.ok) {
    throw new Error(body?.message || "Role API request failed");
  }

  return body as T;
};

export const fetchRoles = async () => {
  return request<Role[]>("/roles");
};

export const fetchPermissions = async () => {
  return request<Permission[]>("/permissions");
};

export const assignPermissionsToRole = async (
  roleId: string,
  permissionIds: string[]
) => {
  return request<Role>(`/roles/${encodeURIComponent(roleId)}/permissions`, {
    method: "POST",
    body: JSON.stringify({ permissionIds }),
  });
};

export const updateRolePermissions = async (
  roleId: string,
  permissionIds: string[]
) => {
  return request<Role>(`/roles/${encodeURIComponent(roleId)}/permissions`, {
    method: "PUT",
    body: JSON.stringify({ permissionIds }),
  });
};
