import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../store";

export const usersAdapter = createEntityAdapter({
  selectId: (instance: User) => instance.idUser as string,
  sortComparer: false,
});

export const initialState = usersAdapter.getInitialState();

const usersMS = "/users-api/api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: `${usersMS}/auth/login`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    auth: builder.query({
      query: () => `${usersMS}/auth`,
    }),
    addNewUser: builder.mutation({
      query: (registeringUser: Registering) => ({
        url: `${usersMS}/auth/register`,
        method: "POST",
        body: { ...registeringUser },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (user: User) => ({
        url: `${usersMS}/users/${user.idUser}`,
        method: "PUT",
        body: { ...user },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "User", id: arg.id },
      ],
    }),
    getUsers: builder.query({
      query: () => `${usersMS}/users`,
      transformResponse: (responseData: any) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "User", id })),
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `${usersMS}/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "User", id: arg.id },
      ],
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
  useUpdateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult: any) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState
);
