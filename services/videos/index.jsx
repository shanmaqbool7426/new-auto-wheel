import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const videosApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.VIDEOS.LIST,
        method: 'GET',
        params
      }),
      providesTags: ['VIDEOS']
    }),

    getBrowseVideos: builder.query({
      query: () => ({
        url: API_ENDPOINTS.VIDEOS.BROWSE,
        method: 'GET'
      }),
      providesTags: ['VIDEOS']
    }),

    getVideoDetail: builder.query({
      query: (id) => ({
        url: API_ENDPOINTS.VIDEOS.DETAIL(id),
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'VIDEOS', id }]
    })
  })
});

export const {
  useGetVideosQuery,
  useGetBrowseVideosQuery,
  useGetVideoDetailQuery
} = videosApi;