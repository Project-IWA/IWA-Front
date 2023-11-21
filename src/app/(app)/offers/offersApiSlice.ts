import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

export const offersAdapter = createEntityAdapter({
  selectId: (instance: Offre) => instance.idOffre as string,
  sortComparer: false,
});

export const initialState = offersAdapter.setAll(
  offersAdapter.getInitialState(),
  [
    {
      idOffre: "1",
      emploi: "Développeur Front-end",
      dateDebut: new Date("2023-10-01"),
      dateFin: new Date("2023-12-31"),
      salaire: 55000,
      avantages: "Assurance santé, Télétravail",
      etat: "Ouverte",
      nombreCandidats: 15,
      idUser: "1",
      idEtablissement: "1",
      description: "Description de l'offre 1",
      attributions: [
        {
          idOffre: "1",
          emailCandidat: "j@gmail.com",
          etat: "En cours",
        },
        {
          idOffre: "1",
          emailCandidat: "m@gmail.com",
          etat: "Terminée",
        },
      ],
    },
    {
      idOffre: "2",
      emploi: "Développeur Front-end",
      dateDebut: new Date("2023-10-01"),
      dateFin: new Date("2023-12-31"),
      salaire: 55000,
      avantages: "Assurance santé, Télétravail",
      etat: "Ouverte",
      nombreCandidats: 15,
      idUser: "1",
      idEtablissement: "1",
      description: "Description de l'offre 1",
      attributions: [],
    },
  ]
);

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getOffers: builder.query({
      query: () => `/offres`,
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
        url: "/offres",
        method: "POST",
        body: {
          ...initialOffer,
        },
      }),
      invalidatesTags: [{ type: "Offer", id: "LIST" }],
    }),
    updateOffer: builder.mutation({
      query: (initialOffer: Offre) => ({
        url: `/offres/${initialOffer.idOffre}`,
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
        url: `/offres/${offerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Offer", id: arg.id },
      ],
    }),
    updateAttribution: builder.mutation({
      query: (initialAttribution: Attribution) => ({
        url: `/offres/attributions/${initialAttribution.idAttribution}`,
        method: "PUT",
        body: {
          ...initialAttribution,
        },
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
