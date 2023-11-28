import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { View, Text } from "react-native";
import { Button as Btn } from "native-base";
import { Link } from "expo-router";
import { Portal, Dialog, Button, Snackbar } from "react-native-paper";
import { useState } from "react";
import { useAddNewNotificationMutation } from "../notifications/notificationsApiSlice";

export default function Profile() {
  const user: User | null = useSelector(selectCurrentUser) as User;

  const [dialog, setDialog] = useState<boolean>(false);

  const [snackbar, setSnackbar] = useState<string | null>(null);

  const [addNewNotif] = useAddNewNotificationMutation();

  async function handleSendNotif() {
    try {
      setDialog(false);
      await addNewNotif({
        idUser: user?.idUser,
        etat: "En attente",
        date: new Date(),
        type: "Suppression",
      } as AddNotif).unwrap();
      setSnackbar("Demande de suppression envoyée !");
    } catch (err: any) {
      console.error(err.message);
      setSnackbar("Erreur, notification non envoyée");
    }
  }

  return (
    <View className="bg-white rounded-lg p-6 shadow-md m-4 mt-12">
      <View className="flex justify-center items-center mb-4">
        <Text className="text-3xl font-bold text-blue-500">
          {user.prenom} {user.nom}
        </Text>
        <Text className="text-3xl font-bold mb-4">{user.role}</Text>
      </View>
      <View className="mb-4">
        <View className="mb-4">
          <Text>{user.email}</Text>
        </View>
        <Text className="text-gray-700">{user.tel}</Text>
      </View>
      <View className="mb-4">
        <Text className="font-semibold text-blue-500">
          Formule: {user.formule?.typeFormule}
        </Text>
        <Text className="font-semibold text-blue-500">
          Début: {user.dateDebutSouscription?.slice(0, 10)}
        </Text>
        <Text className="font-semibold text-blue-500">
          Fin: {user.dateFinSouscription?.slice(0, 10)}
        </Text>
      </View>
      {user.etablissementPrincipal && (
        <View className="mb-4">
          <Text className="font-semibold text-blue-500">
            Établissement: {user.etablissementPrincipal?.nom}
          </Text>
        </View>
      )}
      <Link
        className="bg-blue-500 py-3 px-6 rounded-lg text-white text-center font-bold text-lg"
        href="/profile/update"
      >
        Modifier le profil
      </Link>
      <Btn
        onPress={() => setDialog(true)}
        className="py-3 mt-2 px-6 rounded-lg bg-blue-500"
      >
        <Text className="text-white text-center font-bold text-lg">
          Supprimer le compte
        </Text>
      </Btn>
      <Snackbar
        visible={snackbar !== null}
        onDismiss={() => setSnackbar(null)}
        duration={2000}
      >
        {snackbar}
      </Snackbar>
      <Portal>
        <Dialog
          visible={dialog}
          onDismiss={() => setDialog(false)}
          style={{ borderRadius: 8 }}
        >
          <Dialog.Title className="font-bold">
            Suppression du compte
          </Dialog.Title>
          <Dialog.Content>
            <Text className="text-lg">
              Voulez-vous vraiment supprimer votre compte ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              className="w-16 rounded-lg"
              onPress={() => setDialog(false)}
            >
              Non
            </Button>
            <Button
              mode="contained"
              className="w-16 rounded-lg"
              onPress={handleSendNotif}
            >
              Oui
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
