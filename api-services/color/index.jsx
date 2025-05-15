import { BASE_API } from '@/api-services/base-api';
import { COLOR_BASE,BASE_URL } from '@/constants/api-endpoints';

export const colorAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query({
      query: (params) => ({
        url: `${COLOR_BASE}`,
        method: 'GET',
        params,
      }),
      providesTags: ['COLORS'],
    }),
    getColorsByType: builder.query({
      query: ({type}) => ({
        url: `${BASE_URL}/api/color/type?type=${type}`,
        method: 'GET',
      }),
    }),

    updateColor: builder.mutation({
      query: ({ body, id }) => ({
        url: `${COLOR_BASE}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['COLORS'],
    }),

    deleteColor: builder.mutation({
      query: (id) => ({
        url: `${COLOR_BASE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['COLORS'],
    }),

    addColor: builder.mutation({
      query: (body) => ({
        url: `${COLOR_BASE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['COLORS'],
    }),

    deleteBulkColor: builder.mutation({
      query(ids) {
        return {
          url: `${COLOR_BASE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['COLORS'],
    }),
  }),
});

export const {
  useGetColorsQuery,
  useGetColorsByTypeQuery,
  useAddColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
  useDeleteBulkColorMutation,
} = colorAPIs;
