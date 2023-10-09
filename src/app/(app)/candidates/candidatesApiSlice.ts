import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

export const candidatesAdapter = createEntityAdapter({
  selectId: (instance: Candidat) => instance.email,
  sortComparer: false,
});

export const initialState = candidatesAdapter.setAll(
  candidatesAdapter.getInitialState(),
  [
    {
      email: "test@gmail.com",
      firstname: "Jean",
      lastname: "Jacques",
    },
    {
      email: "test1@gmail.com",
      firstname: "Lol",
      lastname: "Jaker",
    },
    {
      email: "test2@gmail.com",
      firstname: "Chris",
      lastname: "Jacques",
    },
  ]
);

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getCandidates: builder.query({
      query: () => `/candidate`,
      transformResponse: (responseData: any) => {
        return candidatesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result: any, error: any, arg: any) => [
        { type: "Candidate", id: "LIST" },
        ...result.ids.map((id: string) => ({ type: "Candidate", id })),
      ],
    }),
    addNewCandidate: builder.mutation({
      query: (initialCandidate: Candidat) => ({
        url: "/candidate",
        method: "POST",
        body: {
          ...initialCandidate,
        },
      }),
      invalidatesTags: [{ type: "Candidate", id: "LIST" }],
    }),
    updateCandidate: builder.mutation({
      query: (initialCandidate: Candidat) => ({
        url: `/candidate/id/${initialCandidate.email}`,
        method: "PUT",
        body: {
          ...initialCandidate,
        },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Candidate", id: arg.id },
      ],
    }),
    deleteCandidate: builder.mutation({
      query: ({ candidateId }: { candidateId: string }) => ({
        url: `/candidate/${candidateId}`,
        method: "DELETE",
        body: { candidateId },
      }),
      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Candidate", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useAddNewCandidateMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
} = extendedApiSlice;

export const selectCandidatesResult =
  extendedApiSlice.endpoints.getCandidates.select();

const selectCandidatesData = createSelector(
  selectCandidatesResult,
  (candidatesResult: any) => candidatesResult.data
);

export const {
  selectAll: selectAllCandidates,
  selectById: selectCandidateById,
  selectIds: selectCandidateIds,
} = candidatesAdapter.getSelectors(
  (state: RootState) => selectCandidatesData(state) ?? initialState
);

export const selectCandidatesByOffer = createSelector(
  selectAllCandidates,
  (_: any, offer: string) => offer,
  (candidates: Candidat[], offer: string) =>
    candidates.filter((candidat: Candidat) => true) //A CHANGER DE OUF
);
