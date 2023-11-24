import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../store";

export const formulesAdapter = createEntityAdapter({
  selectId: (instance: Formule) => instance.idFormule as string,
  sortComparer: false,
});

export const initialState = formulesAdapter.getInitialState();

const usersMS = "/users-api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getFormules: builder.query({
      query: () => `${usersMS}/formules`,
      transformResponse: (responseData: any) => {
        return formulesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Formule", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Formule", id })),
      ],
    }),
  }),
});

export const { useGetFormulesQuery } = extendedApiSlice;

export const selectFormulesResult =
  extendedApiSlice.endpoints.getFormules.select();

const selectFormulesData = createSelector(
  selectFormulesResult,
  (formulesResult: any) => formulesResult.data
);

export const {
  selectAll: selectAllFormules,
  selectById: selectFormuleById,
  selectIds: selectFormuleIds,
} = formulesAdapter.getSelectors(
  (state: RootState) => selectFormulesData(state) ?? initialState
);
