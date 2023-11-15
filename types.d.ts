type User = {
  idUser?: string;
  prenom: string;
  nom: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
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
  dateDebutSouscription?: Date;
  dateFinSouscription?: Date;
  etablissementPrincipal?: Etablissement;
  etablissements: Etablissement[];
};

type Role = {
  idRole?: string;
  name: string;
};

type Etablissement = {
  idEtablissement?: string;
  nom: string;
};

type Formule = {
  idFormule?: string;
  typeFormule: string;
};

type Offre = {
  idOffre?: string;
  emploi: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  salaire: number;
  avantages: string;
  etat: string;
  nombreCandidats: number;
  attributions: Attribution[];
  idUser: string;
  idEtablissement: string;
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
  idOffre?: string;
  emailCandidat: string;
  note: number;
  avis: string;
  etat: string;
  offre: Offre;
};

type Notif = {
  idNotification?: string;
  idUser: string;
  idAdmin: string;
  motifNotification: string;
  etat: string;
};

type Candidat = {
  email: string;
  firstname: string;
  lastname: string;
};
