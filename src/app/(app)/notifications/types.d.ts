type AddNotif = {
  idUser: string;
  etat: "En attente" | "Validée";
  date: Date;
  type: "Suppression" | "Validation";
};

type UpdateNotif = {
  idUser: string;
  etat: "En attente" | "Validée";
  date: Date;
  type: "Suppression" | "Validation";
  idNotification: string;
  idAdmin?: string;
};

type Notif = {
  etat: "En attente" | "Validée";
  date: Date;
  type: "Suppression" | "Validation";
  idNotification: string;
  idAdmin?: string;
  idUser: string;
};
