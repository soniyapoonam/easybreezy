import { WORDPRESS_REST_BASE } from "./config";

function joinPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${WORDPRESS_REST_BASE}${normalized}`;
}

async function wpRequest(path: string, init?: RequestInit): Promise<Response> {
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

  return response;
}

export async function wpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await wpRequest(path, init);
  return (await response.json()) as T;
}

export type WpPaged<T> = {
  data: T;
  total: number;
  totalPages: number;
};

export async function wpFetchPaged<T>(
  path: string,
  init?: RequestInit,
): Promise<WpPaged<T>> {
  const response = await wpRequest(path, init);
  const data = (await response.json()) as T;
  const totalHeader = response.headers.get("X-WP-Total");
  const pagesHeader = response.headers.get("X-WP-TotalPages");
  const total = Number.parseInt(totalHeader ?? "", 10);
  const totalPages = Number.parseInt(pagesHeader ?? "", 10);

  return {
    data,
    total: Number.isFinite(total) ? total : Array.isArray(data) ? data.length : 0,
    totalPages: Number.isFinite(totalPages) ? totalPages : 1,
  };
}
