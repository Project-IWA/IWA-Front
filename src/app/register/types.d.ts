type Registering = {
  username: string;
  password: string;
  password2: string;
  dateDebut: Date;
  dateFin: Date;
  formule: string;
  nom: string;
  prenom: string;
  currentPage: number;
};

type PostRegister = {
  username: string;
  password: string;
  idFormule: string;
  prenom: string;
  nom: string;
  dateDebutSouscription: Date;
  dateFinSouscription: Date;
}