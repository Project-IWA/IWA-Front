import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

export const offersAdapter = createEntityAdapter({
  selectId: (instance: Offer) => instance.id,
  sortComparer: false,
});

export const initialState = offersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getOffers: builder.query({
      query: () => `/offer`,
      transformResponse: (responseData: any) => {
        return offersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Offer", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Offer", id })),
      ],
    }),
    addNewOffer: builder.mutation({
      query: (initialOffer: Offer) => ({
        url: "/offer",
        method: "POST",
        body: {
          ...initialOffer,
        },
      }),
      invalidatesTags: [{ type: "Offer", id: "LIST" }],
    }),
    updateOffer: builder.mutation({
      query: (initialOffer: Offer) => ({
        url: `/offer/id/${initialOffer.id}`,
        method: "PUT",
        body: {
          ...initialOffer,
        },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Offer", id: arg.id },
      ],
    }),
    deleteOffer: builder.mutation({
      query: ({ offerId }: { offerId: string }) => ({
        url: `/offer/${offerId}`,
        method: "DELETE",
        body: { offerId },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Offer", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useAddNewOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = extendedApiSlice;

export const selectOffersResult = extendedApiSlice.endpoints.getOffers.select();

const selectOffersData = createSelector(
  selectOffersResult,
  (offersResult: any) => offersResult.data
);

export const {
  selectAll: selectAllOffers,
  selectById: selectOfferById,
  selectIds: selectOfferIds,
} = offersAdapter.getSelectors(
  (state: RootState) => selectOffersData(state) ?? initialState
);
