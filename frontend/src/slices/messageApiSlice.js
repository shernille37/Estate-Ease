import { MESSAGE_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { getToken } from "../utils/getToken";

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (page) => ({
        url: `${MESSAGE_URL}?page=${page - 1}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getMessagesCount: builder.query({
      query: () => ({
        url: `${MESSAGE_URL}/count`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: MESSAGE_URL,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      }),
    }),
    markRead: builder.mutation({
      query: (id) => ({
        url: `${MESSAGE_URL}/${id}/read`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `${MESSAGE_URL}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useMarkReadMutation,
  useDeleteMessageMutation,
  useGetMessagesCountQuery,
} = messageApiSlice;
