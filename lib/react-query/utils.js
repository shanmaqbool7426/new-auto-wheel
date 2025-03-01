import { dehydrate } from '@tanstack/react-query';
import { getQueryClient } from './get-query-client';
import { QUERY_STALE_TIME } from './config';
import { handleApiError } from './error-utils';

// Server-side prefetch
export async function prefetchQueryServer(queryKey, queryFn) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: QUERY_STALE_TIME,
  });
  return dehydrate(queryClient);
}

// Prefetch query helper
export const prefetchQuery = async (queryClient, queryKey, queryFn, options = {}) => {
  return queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: QUERY_STALE_TIME,
    ...options,
  });
};

// Invalidate queries helper
export const invalidateQueries = (queryClient, queryKey) => {
  return queryClient.invalidateQueries({ queryKey });
};

// Handle mutation error helper
export const handleMutationError = (error) => {
  console.error('Mutation error:', error);
  return handleApiError(error);
};

// Optimistic update helper
export const optimisticUpdate = (queryClient, queryKey, updateFn) => {
  queryClient.setQueryData(queryKey, (oldData) => updateFn(oldData));
};
