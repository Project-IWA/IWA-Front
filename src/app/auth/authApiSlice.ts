import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    auth: builder.query({
      query: () => "/user/auth",
    }),
    addNewUser: builder.mutation({
      query: (registeringUser: Registering) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...registeringUser },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useAuthQuery,
  useGetUrlQuery,
  useGetAccessTokenMutation,
  useLogMutation,
  useAddNewUserMutation,
} = authApiSlice;
