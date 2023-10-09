import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

export const offersAdapter = createEntityAdapter({
  selectId: (instance: Offre) => instance.id as string,
  sortComparer: false,
});

export const initialState = offersAdapter.setAll(
  offersAdapter.getInitialState(),
  [
    {
      id: "1",
      emploi: "Développeur Front-end",
      dateDebut: new Date("2023-10-01"),
      dateFin: new Date("2023-12-31"),
      salaire: 55000,
      avantages: ["Assurance santé", "Télétravail"],
      etat: "Ouverte",
      nbCandidats: 15,
      recruteur: "1",
      etablissement: {
        id: "1",
        nom: "Entreprise A",
      },
      description: "Description de l'offre 1",
    },
    {
      id: "2",
      emploi: "Ingénieur en Informatique",
      dateDebut: new Date("2023-11-15"),
      dateFin: new Date("2024-03-15"),
      salaire: 60000,
      avantages: ["Assurance santé", "Tickets restaurant"],
      etat: "Ouverte",
      nbCandidats: 10,
      recruteur: "1",
      etablissement: {
        id: "2",
        nom: "Entreprise B",
      },
      description: "Description de l'offre 2",
    },
    {
      id: "3",
      emploi: "Ingénieur en Informatique",
      dateDebut: new Date("2023-11-15"),
      dateFin: new Date("2024-03-15"),
      salaire: 60000,
      avantages: ["Assurance santé", "Tickets restaurant"],
      etat: "Ouverte",
      nbCandidats: 10,
      recruteur: "1",
      etablissement: {
        id: "2",
        nom: "Entreprise B",
      },
      description: "Description de l'offre 2",
    },
    {
      id: "4",
      emploi: "Ingénieur en Informatique",
      dateDebut: new Date("2023-11-15"),
      dateFin: new Date("2024-03-15"),
      salaire: 60000,
      avantages: ["Assurance santé", "Tickets restaurant"],
      etat: "Ouverte",
      nbCandidats: 10,
      recruteur: "1",
      etablissement: {
        id: "2",
        nom: "Entreprise B",
      },
      description: "Description de l'offre 2",
    },
    {
      id: "5",
      emploi: "Ingénieur en Informatique",
      dateDebut: new Date("2023-11-15"),
      dateFin: new Date("2024-03-15"),
      salaire: 60000,
      avantages: ["Assurance santé", "Tickets restaurant"],
      etat: "Ouverte",
      nbCandidats: 10,
      recruteur: "1",
      etablissement: {
        id: "2",
        nom: "Entreprise B",
      },
      description: "Description de l'offre 2",
    },
  ]
);

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
      query: (initialOffer: Offre) => ({
        url: "/offer",
        method: "POST",
        body: {
          ...initialOffer,
        },
      }),
      invalidatesTags: [{ type: "Offer", id: "LIST" }],
    }),
    updateOffer: builder.mutation({
      query: (initialOffer: Offre) => ({
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

export const selectAttributionsByUser = createSelector(
  selectAllOffers,
  (allOffers: Offre[]) => allOffers.filter((offer: Offre) => true) // A CHANGER
);
