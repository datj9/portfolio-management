import { Pagination, StrapiCollectionResponse, StrapiSingleResponse } from '../types';

export function buildSingleResponse<T>(
  payload: { id: number; attributes: T } | null,
): StrapiSingleResponse<T> {
  return {
    data: payload,
  };
}

export function buildCollectionResponse<T>(
  items: Array<{ id: number; attributes: T }>,
  pagination: Pagination,
): StrapiCollectionResponse<T> {
  return {
    data: items,
    meta: {
      pagination,
    },
  };
}

export function createPagination(total: number, page: number, pageSize: number): Pagination {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const pageCount = Math.max(1, Math.ceil(total / safePageSize));

  return {
    total,
    page: safePage,
    pageSize: safePageSize,
    pageCount,
  };
}
