import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers: any) => {
      const token = localStorage.token;
      if (token) {
        headers.set("token", token);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });

export const apiSlice: any = createApi({
    baseQuery,
    tagTypes: ["User", "Job"],
    endpoints: (builder) => ({}),
  });