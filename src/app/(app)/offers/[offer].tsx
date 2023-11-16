import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectOfferById } from "./offersApiSlice";
import { View, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Button } from "native-base";
import UpdateOffer from "./UpdateOffer";

export default function Offer() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  const offer: Offre | undefined = useSelector((state: RootState) =>
    selectOfferById(state, offerId)
  );

  const [update, setUpdate] = useState<boolean>(false);

  if (!offer) {
    return <Text>Erreur, offre non trouvée</Text>;
  }

  return (
    <ScrollView>
      <View className="p-6 m-4 bg-gray-200 rounded-lg shadow-black flex flex-col mt-16">
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
          <Text className="text-lg text-gray-900">{offer.avantages}</Text>
        </View>
        <View className="flex flex-row mb-2">
          <Text className="text-lg font-semibold text-gray-600 mr-2">
            Statut:
          </Text>
          <Text className="text-lg text-gray-900">{offer.etat}</Text>
        </View>
        <Link
          href={`/offers/candidates/${offerId}`}
          className="bg-blue-500 py-3 px-6 rounded-lg"
        >
          <Text className="text-white text-center font-bold text-lg">
            Voir les {offer.nombreCandidats} candidats
          </Text>
        </Link>
        {!update ? (
          <Button
            onPress={() => setUpdate(true)}
            className="py-3 mt-2 px-6 rounded-lg bg-blue-500"
          >
            <Text className="text-white text-center font-bold text-lg">
              Modifier
            </Text>
          </Button>
        ) : (
          <Button
            onPress={() => setUpdate(false)}
            className="py-3 mt-2 px-6 rounded-lg bg-blue-500"
          >
            <Text className="text-white text-center font-bold text-lg">
              Ne plus modifier
            </Text>
          </Button>
        )}
      </View>
      {update && <UpdateOffer offre={offer} />}
    </ScrollView>
  );
}
