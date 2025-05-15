import { BASE_API } from '@/api-services/base-api';
import { DRIVE_BASE } from '@/constants/api-endpoints';

export const driveAPIs = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getDrives: builder.query({
      query: (params) => ({
        url: `${DRIVE_BASE}`,
        method: 'GET',
        params,
      }),
      providesTags: ['DRIVES'],
    }),

    updateDrive: builder.mutation({
      query: ({ body, id }) => ({
        url: `${DRIVE_BASE}/${id}`,
        method: 'PUT',          
        body,
      }),
      invalidatesTags: ['DRIVES'],
    }),

    deleteDrive: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.DRIVE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DRIVES'],
    }),

    addDrive: builder.mutation({
      query: (body) => ({
        url: `${DRIVE_BASE}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DRIVES'],
    }),

    deleteBulkDrive: builder.mutation({
      query(ids) {
        return {
          url: `${DRIVE_BASE}`,
          method: 'POST',
          body: { ids: ids },
        };
      },
      invalidatesTags: ['DRIVES'],
    }),
  }),
});

export const {
  useGetDrivesQuery,
  useAddDriveMutation,
  useUpdateDriveMutation,
  useDeleteDriveMutation,
  useDeleteBulkDriveMutation,
} = driveAPIs; 