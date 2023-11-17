import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  selectNotificationById,
  useUpdateNotificationMutation,
} from "./notificationsApiSlice";
import { View, Text, TouchableOpacity } from "react-native";
import {
  selectUserById,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../auth/usersApiSlice";

export default function Offer() {
  const { notification: notificationId } = useLocalSearchParams() as {
    notification: string;
  };

  const notification: Notif | undefined = useSelector((state: RootState) =>
    selectNotificationById(state, notificationId)
  ) as Notif;

  const { isLoading } = useGetUsersQuery();

  const user: User | undefined = useSelector((state: RootState) =>
    selectUserById(state, notification?.idUser)
  ) as User;

  const [updateNotification] = useUpdateNotificationMutation();
  const [deleteUser] = useDeleteUserMutation();

  async function handleDeleteUser() {
    try {
      await deleteUser({ idUser: notification?.idUser }).unwrap();
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function handleUpdateNotification() {
    try {
      await handleDeleteUser();
      await updateNotification({
        ...notification,
        etat: "Validée",
      });
    } catch (err: any) {
      console.error("Erreur", err.message);
    }
  }

  if (isLoading) {
    return <Text>Loading notif...</Text>;
  }

  if (!notification || !user) {
    return <Text>Erreur, notification non trouvée</Text>;
  }

  return (
    <View className="p-6 m-4 bg-gray-200 rounded-lg shadow-black flex flex-col mt-8">
      <Text className="text-3xl font-bold mb-4">
        {`${notification.type} de ${user.prenom} ${user.nom}`}
      </Text>
      <View className="flex flex-row mb-2">
        <Text className="text-lg font-semibold text-gray-600 mr-2">Etat :</Text>
        <Text className="text-lg text-gray-900">{notification.etat}</Text>
      </View>
      <TouchableOpacity onPress={handleUpdateNotification}>
        Valider la demande
      </TouchableOpacity>
    </View>
  );
}
