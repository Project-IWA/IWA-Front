type Notif = {
  idNotification?: string;
  idUser: string;
  idAdmin?: string;
  etat: "En attente" | "Validée";
  date: Date;
  type: "Suppression" | "Validation";
};
