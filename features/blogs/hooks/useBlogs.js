import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { blogApi } from '../api/queries';
import { queryKeys } from '@/lib/react-query/constants';

// Hook for blog listings with pagination
export function useBlogs(filters = {}) {
  return useQuery({
    queryKey: queryKeys.blogs.list(filters),
    queryFn: () => blogApi.getBlogs(filters),
    select: (data) => ({
      blogs: data?.data || [],
      pagination: data?.pagination || {}
    })
  });
}

// Hook for infinite scroll blog listings
export function useInfiniteBlogs(filters = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.blogs.list(filters),
    queryFn: ({ pageParam = 1 }) => 
      blogApi.getBlogs({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
  });
}

// Hook for browse blogs
export function useBrowseBlogs(type) {
  return useQuery({
    queryKey: queryKeys.blogs.browse(type),
    queryFn: () => blogApi.getBrowseBlogs(type),
    select: (data) => {
      if (!data?.data) return [];
      return data.data.map(blog => ({
        ...blog,
        content: blog.content?.substring(0, 150) || '', // Truncate content for preview
      }));
    },
  });
}

// Hook for blog search
export function useSearchBlogs(query) {
  return useQuery({
    queryKey: queryKeys.blogs.search(query),
    queryFn: () => blogApi.searchBlogs(query),
    enabled: !!query,
  });
}

// Hook for blog detail
export function useBlogDetail(id) {
  return useQuery({
    queryKey: queryKeys.blogs.detail(id),
    queryFn: () => blogApi.getBlogDetail(id),
    enabled: !!id
  });
}

// Hook for blog comments
export function useBlogComments(blogId) {
  return useQuery({
    queryKey: queryKeys.blogs.comments(blogId),
    queryFn: () => blogApi.getBlogComments(blogId),
    enabled: !!blogId
  });
}

// Hook for adding comments
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogApi.addComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.blogs.comments(variables.blogId) 
      });
    },
  });
}

// Hook for managing comments
export function useManageComment() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: blogApi.deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.blogs.comments(variables.blogId) 
      });
    },
  });

  return {
    deleteComment: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}