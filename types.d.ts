type Recruiter = {
  id: string;
  prenom: string;
  nom: string;
  tel: string;
  addresse: Address;
  siret: string;
  justificatif: string;
  formule: Formule;
  dateDebut: Date;
  dateFin: Date;
  etablissement: Etablissement;
};

type Admin = {
  id: string;
};

type User = {
  role: "recruteur" | "admin";
  recruteur?: Recruteur;
  admin?: Admin;
  id: string;
  mail: string;
  password: string;
};

type Formula = {
  id: string;
  type: string;
};

type Establishment = {
  id: string;
  nom: string;
  adresse: Address;
};

type Offer = {
  id: string;
  emploi: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  salaire: number;
  avantages: string[];
  status: string;
  nbCandidats: number;
  user: Recruteur;
};

type Attribution = {
  id: string;
  candidat: string;
  note: number;
  recommendation: string;
};

type Address = {
  streetNum: string;
  street: string;
  complement?: string;
  zipCode: string;
  city: string;
  country: string;
};

type Reference = {
  refName: string;
  refEstablishment: string;
  refAddress: Address;
  refPhone: string;
  refEmail: string;
};

type Experience = {
  job: string;
  jobCategory: string;
  startedAt: string;
  endedAt: string;
  establishment: {
    establishmentName: string;
    establishmentAddress: Address;
  };
};

type Availability = {
  job: string;
  jobCategory: string;
  startsAt: string;
  endsAt: string;
  places: string[];
};

type Opinion = {
  score: number;
  message: string;
  employerId: string;
  providedAt: Date;
};

type Candidate = {
  firstname: string;
  lastname: string;
  gender: 0 | 1 | 2 | 9;
  birthDate: string;
  citizenship: string;
  address: Address;
  email: string;
  phone: string;
  photo: any;
  cv: string;
  shortBio: string;
  references: Reference[];
  experiences: Experience[];
  availabilities: Availability[];
  opinions: Opinion[];
};
