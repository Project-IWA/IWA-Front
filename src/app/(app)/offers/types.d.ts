type Offre = {
  idOffre?: string;
  emploi: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  salaire: number;
  avantages: string;
  etat: "Ouverte" | "Archivée";
  nombreCandidats: number;
  attributions?: Attribution[];
  idUser?: string;
  idEtablissement: string;
  idTypeEmploi: string;
};
