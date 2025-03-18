import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const driveTypesApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getDriveTypes: builder.query({
      query: (type) => ({
        url: API_ENDPOINTS.DRIVE.GET(type),
        method: 'GET'
      }),
      providesTags: ['DRIVE']
    })
  })
});

export const { useGetDriveTypesQuery } = driveTypesApi;