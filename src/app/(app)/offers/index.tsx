import { useSelector } from "react-redux";
import { selectAllOffers, useGetOffersQuery } from "./offersApiSlice";
import { RootState } from "../../store";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Offers() {
  const { isLoading } = useGetOffersQuery();

  const offers: Offre[] = useSelector((state: RootState) =>
    selectAllOffers(state)
  );

  if (isLoading) {
    return <Text>Loading offers...</Text>;
  }

  return (
    <FlatList<Offre>
      data={offers}
      keyExtractor={(item: Offre) => item.id as string}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/offers/${item.id}`)}>
          <View>
            <Text>{item.emploi}</Text>
            <Text>{`${item.dateDebut} - ${item.dateFin}`}</Text>
            <Text>{item.salaire} €</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
