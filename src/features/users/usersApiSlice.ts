import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../../app/store";

type User = { id: string };

export const usersAdapter = createEntityAdapter({
  selectId: (instance: User) => instance.id,
  sortComparer: false,
});

export const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getUsers: builder.query({
      query: () => `/user`,
      transformResponse: (responseData: any) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "User", id })),
      ],
    }),
    addNewUser: builder.mutation({
      query: (initialUser: User) => ({
        url: "/user",
        method: "POST",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUser: User) => ({
        url: `/user/id/${initialUser.id}`,
        method: "PUT",
        body: {
          ...initialUser,
        },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "User", id: arg.id },
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        url: `/user/${userId}`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "User", id: arg.id },
      ],
    }),
    checkToken: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: `/user/register`,
        method: "POST",
        body: { token: token as string },
      }),
    }),
    registerUser: builder.mutation({
      query: ({ password }: { password: string }) => ({
        url: `/user/register`,
        method: "PUT",
        body: { password },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCheckTokenMutation,
  useRegisterUserMutation,
} = extendedApiSlice;

// returns the query result object
export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult: any) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state: RootState) => selectUsersData(state) ?? initialState
);
