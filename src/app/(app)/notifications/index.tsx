import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectAttributionsByUser } from "../offers/offersApiSlice";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Notifications() {
  const notifications = useSelector((state: RootState) =>
    selectAttributionsByUser(state)
  );

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">Notifications</Text>
      <FlatList<Offre>
        className="w-full"
        data={notifications}
        keyExtractor={(item: Offre) => item.id as string}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 rounded-lg shadow-md mx-4 my-2 bg-gray-200"
            onPress={() => router.push(`/offers/${item.id}`)}
          >
            <Text className="text-xl font-semibold mb-2">
              Un utilisateur a matché avec votre offre
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
