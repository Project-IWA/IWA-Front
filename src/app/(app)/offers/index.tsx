import { useSelector } from "react-redux";
import { selectAllOffers, useGetOffersQuery } from "./offersApiSlice";
import { RootState } from "../../store";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Offers() {
  const { isLoading } = useGetOffersQuery();

  const offres: Offre[] = useSelector((state: RootState) =>
    selectAllOffers(state)
  );

  if (isLoading) {
    return <Text>Loading offers...</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">Vos Offres</Text>
      <FlatList<Offre>
        className="w-full"
        data={offres}
        keyExtractor={(item: Offre) => item.idOffre as string}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 rounded-lg shadow-md mx-4 my-2 bg-gray-200"
            onPress={() => router.push(`/offers/${item.idOffre}`)}
          >
            <Text className="text-xl font-semibold mb-2">{item.emploi}</Text>
            {/* ajouter les dates */}
            <Text className="text-blue-600 font-bold text-lg mb-2">
              {item.salaire} €
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
