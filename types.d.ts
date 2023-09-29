type User = {
  id: string;
  prenom: string;
  nom: string;
  mail: string;
  password: string;
  role: string;
  tel: string;
  rue: string;
  code_postal: string;
  ville: string;
  siret: string;
  justificatif: string;
  formule: Formule;
  date_debut: Date;
  date_fin: Date;
  etablissement: Etablissement;
};

type Formule = {
  id: string;
  type: string;
};

type Etablissement = {
  id: string;
  nom: string;
};

type Offre = {
  id: string;
  emploi: string;
  description: string;
  date_debut: Date;
  date_fin: Date;
  salaire: number;
  avantages: string[];
  status: string;
  nb_candidats: number;
  user: User;
};

type Attribution = {
  id: string;
  mail_candidat: string;
  note: number;
  recommendation: string;
};
