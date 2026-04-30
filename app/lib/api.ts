export const API_BASE_URL = "https://vel-disability-exhibition-production.up.railway.app/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      (data as { error?: string }).error || "Request failed. Please try again.";
    throw new Error(message);
  }

  return data as T;
}

export async function postJson<T>(
  path: string,
  payload: Record<string, unknown>
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      (data as { error?: string }).error || "Request failed. Please try again.";
    throw new Error(message);
  }

  return data as T;
}

export async function postFormData<T>(path: string, payload: FormData): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    body: payload,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      (data as { error?: string }).error || "Request failed. Please try again.";
    throw new Error(message);
  }

  return data as T;
}
