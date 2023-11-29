import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  selectNotificationById,
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
} from "./notificationsApiSlice";
import { View, Text, TouchableOpacity } from "react-native";
import {
  selectUserById,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../auth/usersApiSlice";
import { useState } from "react";
import { Snackbar } from "react-native-paper";
import Loading from "../../../ui/Loading";

export default function Offer() {
  const { notification: notificationId } = useLocalSearchParams() as {
    notification: string;
  };

  const { isLoading: loadingNotif } = useGetNotificationsQuery();

  const notification: Notif | undefined = useSelector((state: RootState) =>
    selectNotificationById(state, notificationId)
  ) as Notif;

  const { isLoading: loadingUsers } = useGetUsersQuery();

  const user: User | undefined = useSelector((state: RootState) =>
    selectUserById(state, notification.idUser)
  ) as User;

  const [updateNotification] = useUpdateNotificationMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [snackbar, setSnackbar] = useState<string | null>(null);

  async function handleDeleteUser() {
    try {
      await deleteUser({ userId: notification?.idUser }).unwrap();
      setSnackbar("Utilisateur supprimé !");
    } catch (err: any) {
      console.error(err.message);
      setSnackbar("Erreur, utilisateur non supprimé");
    }
  }

  async function handleUpdateNotification() {
    try {
      await handleDeleteUser();
      await updateNotification({
        ...notification,
        etat: "Validée",
      });
      setSnackbar("Notification mise à jour !");
      router.push("/notifications");
    } catch (err: any) {
      console.error("Erreur", err.message);
      setSnackbar("Erreur, notification non mise à jour");
    }
  }

  if (loadingUsers || loadingNotif) {
    return <Loading text="Loading notification" />;
  }

  if (!notification || !user) {
    return <Loading text="Erreur, notification non trouvée" />;
  }

  return (
    <View className="p-6 m-4 bg-gray-200 rounded-lg shadow-black flex flex-col mt-8">
      <Text className="text-3xl font-bold mb-4">
        {`${notification.type} de ${user.prenom} ${user.nom}`}
      </Text>
      <View className="flex flex-row mb-2">
        <Text className="text-lg font-semibold text-gray-600 mr-2">Etat :</Text>
        <Text className="text-lg text-gray-900">
          {notification.etat || "En attente"}
        </Text>
      </View>
      <TouchableOpacity
        className="py-3 px-6 rounded-lg items-center bg-blue-500"
        onPress={handleUpdateNotification}
      >
        <Text className="text-white font-bold text-lg">Valider la demande</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackbar !== null}
        onDismiss={() => setSnackbar(null)}
        duration={2000}
      >
        {snackbar}
      </Snackbar>
    </View>
  );
}
