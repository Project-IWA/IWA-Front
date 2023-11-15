import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { setToken } from "../../utils/token";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: {
    idUser: "1",
    prenom: "John",
    nom: "Doe",
    email: "john.doe@example.com",
    username: "john.doe@example.com",
    etat: "Ok",
    password: "motdepasse123",
    roles: [{ name: "Recruteur" }],
    tel: "0123456789",
    numRue: "123",
    rue: "Rue de la République",
    codePostal: "75001",
    ville: "Paris",
    pays: "France",
    numeroSiret: "12345678900001",
    docJustificatif: "path/vers/justificatif.pdf",
    enabled: true,
    formule: {
      idFormule: "1",
      typeFormule: "Premium",
    },
    dateDebutSouscription: new Date("2023-01-01"),
    dateFinSouscription: new Date("2023-12-31"),
    etablissementPrincipal: {
      idEtablissement: "1",
      nom: "Polytech Montpellier",
    },
    etablissements: [
      {
        idEtablissement: "1",
        nom: "Polytech Montpellier",
      },
    ],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: AuthState,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      if (token) {
        setToken(token);
      }
      if (user) {
        state.user = user;
      }
    },
    setUser: (state: AuthState, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      if (user) {
        state.user = user;
      }
    },
    logOut: (state: AuthState, action: PayloadAction) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
