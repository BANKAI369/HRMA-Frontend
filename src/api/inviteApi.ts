import { API_BASE_URL } from "./baseUrl";

export type OrganizationInvite = {
  id: string;
  email: string;
  roleName: string;
  status: string;
  token: string;
  tenantId: string;
  organizationId: string;
  invitedByUserId?: string | null;
  acceptedByUserId?: string | null;
  expiresAt: string;
  acceptedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AcceptInviteResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role?: { id?: string; name?: string } | string | null;
  };
  message?: string;
};

const readJson = async (res: Response) => {
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.message || "Request failed");
  }
  return body;
};

export async function listInvites(token: string) {
  const res = await fetch(`${API_BASE_URL}/invites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await readJson(res)) as OrganizationInvite[];
}

export async function createInvite(
  token: string,
  email: string,
  roleName?: "Admin" | "Manager" | "Employee"
) {
  const res = await fetch(`${API_BASE_URL}/invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      ...(roleName ? { roleName } : {}),
    }),
  });

  return (await readJson(res)) as OrganizationInvite;
}

export async function getInvite(token: string) {
  const res = await fetch(`${API_BASE_URL}/invites/${encodeURIComponent(token)}`);
  return (await readJson(res)) as OrganizationInvite;
}

export async function acceptInvite(
  token: string,
  username: string,
  password: string
) {
  const res = await fetch(`${API_BASE_URL}/invites/${encodeURIComponent(token)}/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.trim(),
      password,
    }),
  });

  return (await readJson(res)) as AcceptInviteResponse;
}
