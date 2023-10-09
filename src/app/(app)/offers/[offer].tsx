import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectOfferById } from "./offersApiSlice";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Offer() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  const offer: Offre | undefined = useSelector((state: RootState) =>
    selectOfferById(state, offerId)
  );

  if (!offer) {
    return <Text>Erreur, offre non trouvée</Text>;
  }

  return (
    <View className="p-6 m-4 bg-gray-200 rounded-lg shadow-black flex flex-col mt-8">
      <Text className="text-3xl font-bold mb-4">{offer.emploi}</Text>
      <View className="flex flex-row mb-2">
        <Text className="text-lg font-semibold text-gray-600 mr-2">
          Date de début:
        </Text>
        <Text className="text-lg text-gray-900">
          {offer.dateDebut.toISOString().slice(0, 10)}
        </Text>
      </View>
      <View className="flex flex-row mb-2">
        <Text className="text-lg font-semibold text-gray-600 mr-2">
          Date de fin:
        </Text>
        <Text className="text-lg text-gray-900">
          {offer.dateFin.toISOString().slice(0, 10)}
        </Text>
      </View>
      <View className="flex flex-row mb-2">
        <Text className="text-lg font-semibold text-gray-600 mr-2">
          Salaire:
        </Text>
        <Text className="text-lg text-gray-900">{offer.salaire} €</Text>
      </View>
      <View className="flex flex-row mb-2">
        <Text className="text-lg font-semibold text-gray-600 mr-2">
          Avantages:
        </Text>
        <View className="flex flex-column">
          {offer.avantages.map((avantage: string) => (
            <Text key={avantage} className="text-lg text-gray-900">
              {avantage}
            </Text>
          ))}
        </View>
      </View>
      <View className="flex flex-row mb-2">
        <Text className="text-lg font-semibold text-gray-600 mr-2">
          Statut:
        </Text>
        <Text className="text-lg text-gray-900">{offer.etat}</Text>
      </View>
      <Link
        href={`/candidates/offer/${offerId}`}
        className="bg-blue-500 py-3 px-6 rounded-lg"
      >
        <Text className="text-white text-center font-bold text-lg">
          Voir les {offer.nbCandidats} candidats
        </Text>
      </Link>
    </View>
  );
}
