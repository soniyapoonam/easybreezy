import { WORDPRESS_REST_BASE } from "./config";

function joinPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${WORDPRESS_REST_BASE}${normalized}`;
}

export async function wpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(joinPath(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `WordPress request failed (${response.status}) for ${joinPath(path)}`,
    );
  }

  return (await response.json()) as T;
}
