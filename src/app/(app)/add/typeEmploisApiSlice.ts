import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

export const typeEmploisAdapter = createEntityAdapter({
  selectId: (instance: TypeEmploi) => instance.idTypeEmploi as string,
  sortComparer: false,
});

export const initialState = typeEmploisAdapter.getInitialState();

const usersMS = "/recrutements-api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getTypeEmplois: builder.query({
      query: () => `${usersMS}/typeEmplois`,
      transformResponse: (responseData: any) => {
        return typeEmploisAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "TypeEmploi", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "TypeEmploi", id })),
      ],
    }),
  }),
});

export const { useGetTypeEmploisQuery } = extendedApiSlice;

export const selectTypeEmploisResult =
  extendedApiSlice.endpoints.getTypeEmplois.select();

const selectTypeEmploisData = createSelector(
  selectTypeEmploisResult,
  (typeEmploisResult: any) => typeEmploisResult.data
);

export const {
  selectAll: selectAllTypeEmplois,
  selectById: selectTypeEmploiById,
  selectIds: selectTypeEmploiIds,
} = typeEmploisAdapter.getSelectors(
  (state: RootState) => selectTypeEmploisData(state) ?? initialState
);
