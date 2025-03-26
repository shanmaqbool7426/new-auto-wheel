import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROVIDES_TAGS } from "../providesTags";

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
  })

export const BASE_API = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: PROVIDES_TAGS,
  endpoints: (builder) => ({
  }),
});
