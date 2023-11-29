import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/token";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.43.8:8080",
  prepareHeaders: async (headers: any) => {
    const token = await getToken();
    if (token) {
      headers.set("Authorization", token);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice: any = createApi({
  baseQuery,
  tagTypes: [
    "User",
    "Offer",
    "Etablissement",
    "Formule",
    "Notification",
    "Matching",
    "TypeEmploi",
  ],
  endpoints: (builder) => ({}),
});
