import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const blogsApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    // Get all blogs with filters
    getBlogs: builder.query({
      query: (filters = {}) => ({
        url: API_ENDPOINTS.BLOGS.LIST,
        method: 'GET',
        params: filters
      }),
      providesTags: ['BLOGS']
    }),

    // Get blog detail
    getBlogDetail: builder.query({
      query: (id) => ({
        url: `${API_ENDPOINTS.BLOGS.LIST}${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'BLOGS', id }]
    }),

    // Browse blogs
    getBrowseBlogs: builder.query({
      query: (type) => ({
        url: API_ENDPOINTS.BLOGS.BROWSE,
        method: 'GET',
        params: { type }
      }),
      providesTags: ['BLOGS']
    }),

    // Search blogs
    searchBlogs: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.BLOGS.SEARCH,
        method: 'GET',
        params
      }),
      providesTags: ['BLOGS']
    }),

    // Blog comments
    getBlogComments: builder.query({
      query: (blogId) => ({
        url: `${API_ENDPOINTS.COMMENTS.BASE}/${blogId}`,
        method: 'GET'
      }),
      providesTags: (result, error, blogId) => [{ type: 'COMMENTS', id: blogId }]
    }),

    // Add comment
    addComment: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.COMMENTS.BASE,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['COMMENTS']
    }),

    // Delete comment
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `${API_ENDPOINTS.COMMENTS.BASE}/${commentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['COMMENTS']
    })
  })
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailQuery,
  useGetBrowseBlogsQuery,
  useSearchBlogsQuery,
  useGetBlogCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation
} = blogsApi;