import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectOfferById } from "./offersApiSlice";
import { View, Text } from "react-native";

export default function Offer() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  const offer: Offer | undefined = useSelector((state: RootState) =>
    selectOfferById(state, offerId)
  );

  if (!offer) {
    return <Text>Erreur, offre non trouvée</Text>;
  }

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">{offer.emploi}</Text>
      <Text className="text-lg font-semibold mb-2">Description:</Text>
      <Text className="mb-4">{offer.description}</Text>
      <Text className="text-lg font-semibold mb-2">Date de début:</Text>
      <Text className="mb-4">{offer.dateDebut.toString()}</Text>
      <Text className="text-lg font-semibold mb-2">Date de fin:</Text>
      <Text className="mb-4">{offer.dateFin.toString()}</Text>
      <Text className="text-lg font-semibold mb-2">Salaire:</Text>
      <Text className="mb-4">{offer.salaire} €</Text>
      <Text className="text-lg font-semibold mb-2">Avantages:</Text>
      <Text className="mb-4">{offer.avantages.join(", ")}</Text>
      <Text className="text-lg font-semibold mb-2">Status:</Text>
      <Text className="mb-4">{offer.status}</Text>
      <Text className="text-lg font-semibold mb-2">Nombre de candidats:</Text>
      <Text className="mb-4">{offer.nbCandidats}</Text>
      <Text className="text-lg font-semibold mb-2">Recruteur:</Text>
      <Text>
        {offer.user.nom} {offer.user.prenom}
      </Text>
    </View>
  );
}
