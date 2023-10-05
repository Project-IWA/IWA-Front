import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../store";

export const etablissementsAdapter = createEntityAdapter({
  selectId: (instance: Etablissement) => instance.id as string,
  sortComparer: false,
});

export const initialState = etablissementsAdapter.setAll(
  etablissementsAdapter.getInitialState(),
  [
    {
      id: "1",
      nom: "Polytech Montpellier",
    },
    {
      id: "2",
      nom: "Polytech Tours",
    },
    {
      id: "3",
      nom: "Polytech Dijon",
    },
  ]
);

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getEtablissements: builder.query({
      query: () => `/etablissement`,
      transformResponse: (responseData: any) => {
        return etablissementsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Etablissement", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Etablissement", id })),
      ],
    }),
    addNewEtablissement: builder.mutation({
      query: (initialEtablissement: Etablissement) => ({
        url: "/etablissement",
        method: "POST",
        body: {
          ...initialEtablissement,
        },
      }),
      invalidatesTags: [{ type: "Etablissement", id: "LIST" }],
    }),
    updateEtablissement: builder.mutation({
      query: (initialEtablissement: Etablissement) => ({
        url: `/etablissement/id/${initialEtablissement.id}`,
        method: "PUT",
        body: {
          ...initialEtablissement,
        },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Etablissement", id: arg.id },
      ],
    }),
    deleteEtablissement: builder.mutation({
      query: ({ etablissementId }: { etablissementId: string }) => ({
        url: `/etablissement/${etablissementId}`,
        method: "DELETE",
        body: { etablissementId },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Etablissement", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetEtablissementsQuery,
  useAddNewEtablissementMutation,
  useUpdateEtablissementMutation,
  useDeleteEtablissementMutation,
} = extendedApiSlice;

export const selectEtablissementsResult =
  extendedApiSlice.endpoints.getEtablissements.select();

const selectEtablissementsData = createSelector(
  selectEtablissementsResult,
  (etablissementsResult: any) => etablissementsResult.data
);

export const {
  selectAll: selectAllEtablissements,
  selectById: selectEtablissementById,
  selectIds: selectEtablissementIds,
} = etablissementsAdapter.getSelectors(
  (state: RootState) => selectEtablissementsData(state) ?? initialState
);
