import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../api/apiSlice";
import { RootState } from "../../../store";

export const attributionsAdapter = createEntityAdapter({
  selectId: (instance: Attribution) => `${instance.idOffre}-${instance.emailCandidat}` as string,
  sortComparer: false,
});

export const initialState = attributionsAdapter.getInitialState();

const attributionMS = "/recrutements-api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAttributionsByOffre: builder.query({
      query: ({ offerId }: { offerId: string }) =>
        `${attributionMS}/attributions/offre/${offerId}`,
      transformResponse: (responseData: any) => {
        return attributionsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Attribution", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Attribution", id })),
      ],
    }),
    addNewAttribution: builder.mutation({
      query: (initialAttribution: Attribution) => ({
        url: `${attributionMS}/attributions`,
        method: "POST",
        body: {
          ...initialAttribution,
        },
      }),
      invalidatesTags: [{ type: "Attribution", id: "LIST" }, { type: "Offer", id: "LIST" },],
    }),
    updateAttribution: builder.mutation({
      query: (initialAttribution: Attribution) => ({
        url: `${attributionMS}/attributions/`,
        method: "PUT",
        body: {
          ...initialAttribution,
        },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Attribution", id: arg.id },
        { type: "Offer", id: "LIST" },
      ],
    }),
    deleteAttribution: builder.mutation({
      query: ({ attributionId }: { attributionId: string }) => ({
        url: `${attributionMS}/attributions/${attributionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Attribution", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAttributionsQuery,
  useAddNewAttributionMutation,
  useUpdateAttributionMutation,
  useDeleteAttributionMutation,
} = extendedApiSlice;

export const selectAttributionsResult =
  extendedApiSlice.endpoints.getAttributionsByOffre.select();

const selectAttributionsData = createSelector(
  selectAttributionsResult,
  (attributionsResult: any) => attributionsResult.data
);

export const {
  selectAll: selectAllAttributions,
  selectById: selectAttributionById,
  selectIds: selectAttributionIds,
} = attributionsAdapter.getSelectors(
  (state: RootState) => selectAttributionsData(state) ?? initialState
);
