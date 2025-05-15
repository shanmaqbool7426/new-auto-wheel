// Bodies Service

import { BASE_API } from '@/api-services/base-api';
import { BODIES_BASE,BASE_URL } from '@/constants/api-endpoints';

export const bodiesAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({

    getBodies: builder.query({
      query: (params) => ({
        url: `${BODIES_BASE}/${params.type}`,
        method: 'GET',
      }),
      providesTags: ['BODIES'],
    }),
    // update body
    updateBody: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BODIES_BASE}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['BODIES'],
    }),
    // delete body
    deleteBody: builder.mutation({
      query: (id) => ({
        url: `${BODIES_BASE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BODIES'],
    }),

    addBody: builder.mutation({
      query: (body) => ({
        url: `${BODIES_BASE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BODIES'],
    }),

    deleteBulkBody: builder.mutation({
      query(ids) {
        return {
          url: `${BODIES_BASE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['BODIES'],
    }),

  }),
});


export const {
  useGetBodiesQuery,
  useAddBodyMutation,
  useUpdateBodyMutation,
  useDeleteBodyMutation,
  useDeleteBulkBodyMutation,
} = bodiesAPIs;
