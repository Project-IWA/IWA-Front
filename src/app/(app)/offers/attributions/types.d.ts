type AddAttribution = {
  idOffre: string;
  emailCandidat: string;
  etat: "En cours";
};

type UpdateAttribution = {
  idOffre: string;
  emailCandidat: string;
  etat: "En cours" | "Terminée";
  note?: number;
  avis?: string;
  idAttribution: string;
};

type Attribution = {
  idOffre: string;
  emailCandidat: string;
  candidat: Candidat;
  note?: number;
  avis?: string;
  etat: "En cours" | "Terminée";
  idAttribution: string;
};
