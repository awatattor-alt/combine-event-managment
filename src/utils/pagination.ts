/**
 * Returns only the current page items.
 */
export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const offset = (page - 1) * perPage;
  return items.slice(offset, offset + perPage);
}

/**
 * Shared pagination state shape for list-like pages.
 */
export interface PaginationState {
  currentPage: number;
  perPage: number;
  totalItems: number;
}
