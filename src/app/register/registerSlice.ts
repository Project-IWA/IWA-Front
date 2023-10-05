import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface RegisteringState {
  registeringUser: Registering;
}

const initialState: RegisteringState = {
  registeringUser: {
    username: "",
    password: "",
    password2: "",
    tel: "",
    nom: "",
    prenom: "",
    currentPage: 0,
    etablissement: {
      nom: "",
      id: "",
    },
  },
};

const registeringSlice = createSlice({
  name: "registering",
  initialState,
  reducers: {
    setUsername: (state: RegisteringState, action: PayloadAction<string>) => {
      const username = action.payload;
      state.registeringUser.username = username;
    },
    setPassword: (state: RegisteringState, action: PayloadAction<string>) => {
      const password = action.payload;
      state.registeringUser.password = password;
    },
    setPassword2: (state: RegisteringState, action: PayloadAction<string>) => {
      const password2 = action.payload;
      state.registeringUser.password2 = password2;
    },
    setNom: (state: RegisteringState, action: PayloadAction<string>) => {
      const nom = action.payload;
      state.registeringUser.nom = nom;
    },
    setPrenom: (state: RegisteringState, action: PayloadAction<string>) => {
      const prenom = action.payload;
      state.registeringUser.prenom = prenom;
    },
    setTel: (state: RegisteringState, action: PayloadAction<string>) => {
      const tel = action.payload;
      state.registeringUser.tel = tel;
    },
    setCurrentPage: (
      state: RegisteringState,
      action: PayloadAction<number>
    ) => {
      state.registeringUser.currentPage = action.payload;
    },
    setEtablissement: (
      state: RegisteringState,
      action: PayloadAction<Etablissement>
    ) => {
      const etablissement = action.payload;
      state.registeringUser.etablissement = etablissement;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setPassword2,
  setNom,
  setPrenom,
  setCurrentPage,
  setTel,
  setEtablissement,
} = registeringSlice.actions;

export default registeringSlice.reducer;

export const selectCurrentRegisteringUser = (state: RootState) =>
  state.registering.registeringUser;
