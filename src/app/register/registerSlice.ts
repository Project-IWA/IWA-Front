import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface RegisteringState {
  registeringUser: Registering;
}

const dateDebut = new Date();
var dateFin = new Date();
dateFin.setMonth(dateFin.getMonth() + 1);

const initialState: RegisteringState = {
  registeringUser: {
    username: "",
    password: "",
    password2: "",
    nom: "",
    prenom: "",
    currentPage: 0,
    formule: "1",
    dateDebut,
    dateFin,
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
    setFormule: (state: RegisteringState, action: PayloadAction<string>) => {
      const formule = action.payload;
      state.registeringUser.formule = formule;
    },
    setCurrentPage: (
      state: RegisteringState,
      action: PayloadAction<number>
    ) => {
      state.registeringUser.currentPage = action.payload;
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
  setFormule,
} = registeringSlice.actions;

export default registeringSlice.reducer;

export const selectCurrentRegisteringUser = (state: RootState) =>
  state.registering.registeringUser;
