type User = {
  id?: string;
  prenom: string;
  nom: string;
  mail: string;
  password: string;
  role: "Admin" | "Recruteur";
  tel?: string;
  numRue?: string;
  rue?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
  siret?: string;
  justificatif?: string;
  valide?: boolean;
  formule?: Formule;
  dateDebut?: Date;
  dateFin?: Date;
  etablissement?: Etablissement;
};

type Etablissement = {
  id?: string;
  nom: string;
};

type Formule = {
  id?: string;
  nom: string;
};

type Offre = {
  id?: string;
  emploi: string;
  dateDebut: Date;
  dateFin: Date;
  salaire: number;
  avantages: string[];
  etat: string;
  nbCandidats: number;
  recruteur: string;
  etablissement: Etablissement;
  description: string;
};

type Candidat = {
  email: string;
  firstname: string;
  lastname: string;
};

type Registering = {
  username: string;
  password: string;
  password2: string;
  tel: string;
  nom: string;
  prenom: string;
  currentPage: number;
  etablissement: Etablissement;
};

type Attribution = {
  id?: string;
  candidat: string;
  note: number;
  etat: "attente" | "en cours" | "terminée";
};

type Notification = {
  offre: string;
  firstName: string;
  lastName: string;
};
