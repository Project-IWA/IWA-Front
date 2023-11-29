type AddOffre = {
  idOffre?: string;
  emploi: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  salaire: number;
  avantages: string;
  etat: "Ouverte" | "Archivée";
  nombreCandidats: number;
  idUser: string;
  idEtablissement: string;
  idTypeEmploi: string;
};

type Offre = {
  emploi: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  salaire: number;
  avantages: string;
  etat: "Ouverte" | "Archivée";
  nombreCandidats: number;
  idUser: string;
  idEtablissement: string;
  typeEmploi: TypeEmploi;
  idOffre: string;
  attributions: Attribution[];
};
