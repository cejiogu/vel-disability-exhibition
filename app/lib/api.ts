export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
  "http://localhost:5000/api";

console.log("Imported API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);
console.log("Built API_BASE_URL =", API_BASE_URL);

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

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

export async function postForm<T>(path: string, payload: FormData): Promise<T> {
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

export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path}`;
}
