type AddAttribution = {
  idOffre: string;
  emailCandidat: string;
  etat: "En cours";
};

type UpdateAttribution = {
  idOffre: string;
  emailCandidat: string;
  note?: number;
  avis?: string;
};

type Attribution = {
  idOffre: string;
  emailCandidat: string;
  candidat: Candidat;
  note?: number;
  avis?: string;
};
