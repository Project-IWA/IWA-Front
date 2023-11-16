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
