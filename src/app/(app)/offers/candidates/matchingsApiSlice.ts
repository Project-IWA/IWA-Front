import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";
import { RootState } from "../../../store";

export const matchingsAdapter = createEntityAdapter({
  selectId: (instance: Candidat) => instance.email as string,
  sortComparer: false,
});

export const initialState = matchingsAdapter.getInitialState();

const matchingMS = "/recrutements-api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getMatchings: builder.query({
      query: ({ offerId }: { offerId: string }) =>
        `${matchingMS}/offres/matched-candidats/${offerId}`,
      transformResponse: (responseData: any) => {
        return matchingsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Matching", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Matching", id })),
      ],
    }),
  }),
});

export const { useGetMatchingsQuery, useDeleteMatchingMutation } =
  extendedApiSlice;

export const selectMatchingsResult = (offerId: string) =>
  extendedApiSlice.endpoints.getMatchings.select({offerId});

const selectMatchingsData = (offerId: string) => createSelector(
  selectMatchingsResult(offerId),
  (matchingsResult: any) => matchingsResult.data
);

export const selectAllMatchings = (state: RootState, offerId: string) => matchingsAdapter.getSelectors(
  (state: RootState) => selectMatchingsData(offerId)(state) ?? initialState
).selectAll(state);
