import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  selectNotifsByUser,
  useGetNotificationsQuery,
} from "./notificationsApiSlice";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Loading from "../../../ui/Loading";

export default function Notifications() {
  const { isLoading } = useGetNotificationsQuery();

  const notifications = useSelector((state: RootState) =>
    selectNotifsByUser(state)
  );

  if (isLoading) {
    return <Loading text="Loading notifications..." />;
  }

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">Notifications</Text>
      <FlatList<Notif>
        className="w-full"
        data={notifications}
        keyExtractor={(item: Notif) => item.idNotification as string}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`p-4 rounded-lg shadow-md mx-4 my-2 ${
              item.etat === "Validée" ? "bg-gray-500" : "bg-gray-200"
            }`}
            onPress={() => router.push(`/notifications/${item.idNotification}`)}
          >
            <Text className="text-xl font-semibold">{`${item.type}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
