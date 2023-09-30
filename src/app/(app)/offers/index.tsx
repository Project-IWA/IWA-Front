import { useSelector } from "react-redux";
import { selectAllOffers, useGetOffersQuery } from "./offersApiSlice";
import { RootState } from "../../store";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Offers() {
  const { isLoading } = useGetOffersQuery();

  const offers: Offer[] = useSelector((state: RootState) =>
    selectAllOffers(state)
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList<Offer>
      data={offers}
      keyExtractor={(item: Offer) => item.id}
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
