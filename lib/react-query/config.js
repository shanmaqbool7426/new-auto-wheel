export const QUERY_CACHE_TIME = 60 * 60 * 1000; // 1 hour
export const QUERY_STALE_TIME = 60 * 1000; // 1 minute

export const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_CACHE_TIME,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
};
