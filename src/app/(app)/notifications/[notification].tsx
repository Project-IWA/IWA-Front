import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectNotificationById } from "./notificationsApiSlice";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Offer() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  const notification: Notif | undefined = useSelector((state: RootState) =>
    selectNotificationById(state, offerId)
  );

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
    </View>
  );
}
