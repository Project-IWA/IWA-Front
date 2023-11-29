type User = {
  idUser: string;
  prenom: string;
  nom: string;
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Recruteur";
  tel?: string;
  enabled?: boolean;
  numRue?: string;
  rue?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
  numeroSiret?: string;
  docJustificatif?: string;
  etat: string;
  formule?: Formule;
  dateDebutSouscription?: string;
  dateFinSouscription?: string;
  etablissementPrincipal?: Etablissement;
  etablissements: Etablissement[];
};

type UpdateUser = {
  idUser: string;
  prenom: string;
  nom: string;
  tel: string;
};
