import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  selectNotificationById,
  useUpdateNotificationMutation,
} from "./notificationsApiSlice";
import { View, Text, TouchableOpacity } from "react-native";

export default function Offer() {
  const { notification: notificationId } = useLocalSearchParams() as {
    notification: string;
  };

  const notification: Notif | undefined = useSelector((state: RootState) =>
    selectNotificationById(state, notificationId)
  );

  const [updateNotification, { isLoading }] = useUpdateNotificationMutation();

  async function handleUpdateNotification() {
    try {
      await updateNotification({
        ...notification,
        etat: "Validée",
      });
    } catch (err: any) {
      console.error("Erreur", err.message);
    }
  }

  if (!notification) {
    return <Text>Erreur, notification non trouvée</Text>;
  }

  return (
    <View className="p-6 m-4 bg-gray-200 rounded-lg shadow-black flex flex-col mt-8">
      <Text className="text-3xl font-bold mb-4">
        {notification.motifNotification}
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
