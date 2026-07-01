import { API_BASE_URL } from "../api/baseUrl";

const parseResponseBody = async (res: Response) => {
  const txt = await res.text();
  if (!txt) return null;
  try {
    return JSON.parse(txt);
  } catch {
    return null;
  }
};

export const fetchLeaveTypes = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/leave-types`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  const body = await parseResponseBody(res);
  if (!res.ok) {
    return [];
  }

  const list = Array.isArray(body) ? body : body?.data || body?.leaveTypes || [];
  return Array.isArray(list) ? list : [];
};

export const createLeaveRequest = async (payload: {
  userId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason?: string | null;
}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/leaves`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  const body = await parseResponseBody(res);
  if (!res.ok) throw new Error(body?.message || "Failed to create leave request");
  return body;
};

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  const body = await parseResponseBody(res);
  if (!res.ok) throw new Error(body?.message || "Failed to load current user");
  return body;
};
