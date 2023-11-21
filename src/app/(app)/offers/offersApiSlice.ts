import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

export const offersAdapter = createEntityAdapter({
  selectId: (instance: Offre) => instance.idOffre as string,
  sortComparer: false,
});

export const initialState = offersAdapter.getInitialState();

const recrutementsMS = "/recrutements-api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getOffers: builder.query({
      query: () => `${recrutementsMS}/offres`,
      transformResponse: (responseData: any) => {
        return offersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Offer", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Offer", id })),
      ],
    }),
    addNewOffer: builder.mutation({
      query: (initialOffer: Offre) => ({
        url: `${recrutementsMS}/offres`,
        method: "POST",
        body: {
          ...initialOffer,
        },
      }),
      invalidatesTags: [{ type: "Offer", id: "LIST" }],
    }),
    updateOffer: builder.mutation({
      query: (initialOffer: Offre) => ({
        url: `${recrutementsMS}/offres/${initialOffer.idOffre}`,
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
        url: `${recrutementsMS}/offres/${offerId}`,
        method: "DELETE",
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
  useUpdateAttributionMutation,
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

export const selectAttributionsByUser = createSelector(
  selectAllOffers,
  (allOffers: Offre[]) => allOffers.filter((offer: Offre) => true) // A CHANGER
);
