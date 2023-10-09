import { useSelector } from "react-redux";
import { selectAllOffers, useGetOffersQuery } from "./offersApiSlice";
import { RootState } from "../../store";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Offers() {
  //const { isLoading } = useGetOffersQuery();

  const offres: Offre[] = useSelector((state: RootState) =>
    selectAllOffers(state)
  );

  /*
  if (isLoading) {
    return <Text>Loading offers...</Text>;
  }
  */

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">Vos Offres</Text>
      <FlatList<Offre>
        className="w-full"
        data={offres}
        keyExtractor={(item: Offre) => item.id as string}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/offers/${item.id}`)}>
            <View className="bg-white p-4 rounded-lg shadow-md ml-4">
              <Text className="text-xl font-semibold mb-2">{item.emploi}</Text>
              <Text className="text-gray-500 mb-2">
                {`${item.dateDebut.toISOString().slice(0, 10)} - ${item.dateFin
                  .toISOString()
                  .slice(0, 10)}`}
              </Text>
              <Text className="text-blue-600 font-bold text-lg mb-2">
                {item.salaire} €
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
