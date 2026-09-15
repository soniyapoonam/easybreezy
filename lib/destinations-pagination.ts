export const DESTINATIONS_PER_PAGE = 9;

export type PaginationState = {
  currentPage: number;
  totalPages: number;
  showPagination: boolean;
};

export function resolvePageNumber(
  pageParam: string | null | undefined,
  totalItems: number,
  perPage: number = DESTINATIONS_PER_PAGE,
): PaginationState {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const showPagination = totalItems > perPage;

  const parsed = Number.parseInt(pageParam ?? "1", 10);
  let currentPage = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  return { currentPage, totalPages, showPagination };
}

export function paginateItems<T>(
  items: readonly T[],
  currentPage: number,
  perPage: number = DESTINATIONS_PER_PAGE,
): T[] {
  const start = (currentPage - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function buildDestinationsPageUrl(page: number): string {
  if (page <= 1) {
    return "/destinations";
  }
  return `/destinations?page=${page}`;
}

export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);
  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
  }
  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    if (index > 0 && sorted[index] - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[index]);
  }

  return result;
}
