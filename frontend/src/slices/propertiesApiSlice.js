import { PROPERTY_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { getToken } from "../utils/getToken";

const propertiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (page) => ({
        url: `${PROPERTY_URL}?page=${page - 1}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyProperties: builder.query({
      query: (page) => ({
        url: `${PROPERTY_URL}/profile?page=${page - 1}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getSavedProperties: builder.query({
      query: () => ({
        url: `${PROPERTY_URL}/bookmarks`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getRecentProperties: builder.query({
      query: (limit) => ({
        url: `${PROPERTY_URL}/recent?limit=${limit || ""}`,
      }),
    }),
    getProperty: builder.query({
      query: (id) => ({
        url: `${PROPERTY_URL}/${id}`,
      }),
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `${PROPERTY_URL}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    bookmarkProperty: builder.mutation({
      query: (data) => ({
        url: `${PROPERTY_URL}/bookmarks`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getBookmarkStatus: builder.query({
      query: (id) => ({
        url: `${PROPERTY_URL}/bookmarks/${id}/status`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),

    addProperty: builder.mutation({
      query: (data) => ({
        url: PROPERTY_URL,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    updateProperty: builder.mutation({
      query: ({ _id, data }) => ({
        url: `${PROPERTY_URL}/${_id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetRecentPropertiesQuery,
  useGetPropertyQuery,
  useGetMyPropertiesQuery,
  useDeletePropertyMutation,
  useBookmarkPropertyMutation,
  useGetBookmarkStatusQuery,
  useGetSavedPropertiesQuery,
  useAddPropertyMutation,
  useUpdatePropertyMutation,
} = propertiesApiSlice;
