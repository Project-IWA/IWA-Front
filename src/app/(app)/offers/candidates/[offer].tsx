import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { selectOfferById } from "../offersApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Offers() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  const offer: Offre | undefined = useSelector((state: RootState) =>
    selectOfferById(state, offerId)
  );

  if (!offer) {
    return <Text>Erreur, offre non trouvée</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">
        Candidats pour cette offre
      </Text>
      <FlatList<Attribution>
        className="w-full"
        data={offer.attributions}
        keyExtractor={(item: Attribution) => item.emailCandidat}
        renderItem={({ item }) => (
          <View className="p-2 m-2 bg-gray-200 rounded-lg shadow-black flex flex-col">
            <Text className="text-xl font-bold mb-4">{item.emailCandidat}</Text>
            <View className="flex flex-row mb-2">
              <Text className="text-lg font-semibold text-gray-600 mr-2">
                Etat:
              </Text>
              <Text className="text-lg text-gray-900">{item.etat}</Text>
            </View>
            {item.note && (
              <View className="flex flex-row mb-2">
                <Text className="text-lg font-semibold text-gray-600 mr-2">
                  Note:
                </Text>
                <Text className="text-lg text-gray-900">{item.note}</Text>
              </View>
            )}
            {item.avis && (
              <View className="flex flex-row mb-2">
                <Text className="text-lg font-semibold text-gray-600 mr-2">
                  Avis:
                </Text>
                <Text className="text-lg text-gray-900">{item.avis}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
