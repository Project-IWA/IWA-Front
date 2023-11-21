import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";
import { RootState } from "../../../store";

export const matchingsAdapter = createEntityAdapter({
  selectId: (instance: Matching) => instance.idMatching as string,
  sortComparer: false,
});

export const initialState = matchingsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getMatchings: builder.query({
      query: ({ offerId }: { offerId: string }) =>
        `/matchings/offre/${offerId}`,
      transformResponse: (responseData: any) => {
        return matchingsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Matching", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Matching", id })),
      ],
    }),
    addNewMatching: builder.mutation({
      query: (initialMatching: Offre) => ({
        url: "/matchings",
        method: "POST",
        body: {
          ...initialMatching,
        },
      }),
      invalidatesTags: [{ type: "Matching", id: "LIST" }],
    }),
    updateMatching: builder.mutation({
      query: (initialMatching: Offre) => ({
        url: `/matchings/${initialMatching.idOffre}`,
        method: "PUT",
        body: {
          ...initialMatching,
        },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Matching", id: arg.id },
      ],
    }),
    deleteMatching: builder.mutation({
      query: ({ matchingId }: { matchingId: string }) => ({
        url: `/matchings/${matchingId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Matching", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetMatchingsQuery,
  useAddNewMatchingMutation,
  useUpdateMatchingMutation,
  useDeleteMatchingMutation,
} = extendedApiSlice;

export const selectMatchingsResult =
  extendedApiSlice.endpoints.getMatchings.select();

const selectMatchingsData = createSelector(
  selectMatchingsResult,
  (matchingsResult: any) => matchingsResult.data
);

export const {
  selectAll: selectAllMatchings,
  selectById: selectMatchingById,
  selectIds: selectMatchingIds,
} = matchingsAdapter.getSelectors(
  (state: RootState) => selectMatchingsData(state) ?? initialState
);
