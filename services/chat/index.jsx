import { BASE_API } from '@/services/base-api';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

export const chatApi = BASE_API.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: API_ENDPOINTS.CHAT.CONVERSATIONS,
        method: 'GET'
      }),
      providesTags: ['CHAT']
    }),

    getMessages: builder.query({
      query: (conversationId) => ({
        url: API_ENDPOINTS.CHAT.MESSAGES(conversationId),
        method: 'GET'
      }),
      providesTags: (result, error, conversationId) => [
        { type: 'CHAT', id: conversationId }
      ]
    }),

    sendMessage: builder.mutation({
      query: ({ conversationId, message }) => ({
        url: API_ENDPOINTS.CHAT.SEND_MESSAGE(conversationId),
        method: 'POST',
        body: { message }
      }),
      invalidatesTags: (result, error, { conversationId }) => [
        { type: 'CHAT', id: conversationId }
      ]
    }),

    createConversation: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.CHAT.CREATE_CONVERSATION,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['CHAT']
    })
  })
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useCreateConversationMutation
} = chatApi;