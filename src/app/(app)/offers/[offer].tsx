import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectOfferById, useGetOffersQuery } from "./offersApiSlice";
import { View, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Button } from "native-base";
import UpdateOffer from "./UpdateOffer";
import Loading from "../../../ui/Loading";

export default function Offer() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  const { isLoading } = useGetOffersQuery();

  const offer: Offre | undefined = useSelector((state: RootState) =>
    selectOfferById(state, offerId)
  );

  const [update, setUpdate] = useState<boolean>(false);

  if (isLoading) {
    return <Loading text="Loading offre" />;
  }

  if (!offer) {
    return <Loading text="Erreur, offre non trouvée" />;
  }

  return (
    <ScrollView>
      <View className="p-6 m-4 bg-gray-200 rounded-lg shadow-black flex flex-col mt-16 overflow-auto">
        <Text className="text-3xl font-bold mb-4">{offer.emploi}</Text>
        <View className="flex flex-row mb-2">
          <Text className="text-lg font-semibold text-gray-600 mr-2">
            Date de début:
          </Text>
          <Text className="text-lg text-gray-900">{/* date */}</Text>
        </View>
        <View className="flex flex-row mb-2">
          <Text className="text-lg font-semibold text-gray-600 mr-2">
            Date de fin:
          </Text>
          <Text className="text-lg text-gray-900">{/* date */}</Text>
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
        <View className="flex flex-row">
          <Text className="text-lg font-semibold text-gray-600 mr-2">
            Statut:
          </Text>
          <Text className="text-lg text-gray-900">{offer.etat}</Text>
        </View>
        <Link
          href={`/offers/attributions/${offerId}`}
          className="bg-blue-500 py-3 px-6 rounded-lg text-white text-center font-bold text-lg mt-2"
        >
          Voir les candidats attribués
        </Link>
        <Link
          href={`/offers/candidates/${offerId}`}
          className="bg-blue-500 py-3 px-6 rounded-lg text-white text-center font-bold text-lg mt-2"
        >
          Voir le(s) {offer.nombreCandidats} candidat(s)
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
