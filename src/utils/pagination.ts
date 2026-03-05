export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const offset = (page - 1) * perPage;
  return items.slice(0, offset + perPage);
}

export interface PaginationState {
  currentPage: number;
  perPage: number;
  totalItems: number;
}
