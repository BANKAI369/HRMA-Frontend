import { API_BASE_URL } from "../api/baseUrl";

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
    throw new Error(body?.message || "Posts API request failed");
  }

  return body as T;
};

export const fetchPosts = async (scope?: string) => {
  const url = scope ? `/posts/feed?scope=${scope}` : "/posts/feed";
  return request<any[]>(url, { method: "GET" });
};

export const createPost = async (data: Record<string, unknown>) => {
  return request<any>("/posts", { method: "POST", body: JSON.stringify(data) });
};

export const deletePost = async (postId: string) => {
  return request<void>(`/posts/${encodeURIComponent(postId)}`, {
    method: "DELETE",
  });
};

export default {
  fetchPosts,
  createPost,
  deletePost,
};
