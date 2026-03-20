export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
  "http://localhost:5000/api";

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
