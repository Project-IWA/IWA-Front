import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useAddNewOfferMutation } from "../offers/offersApiSlice";
import { router } from "expo-router";

export default function NewOffer() {
  const [offer, setOffer] = useState<Offre>({
    emploi: "",
    dateDebut: new Date(),
    dateFin: new Date(),
    salaire: 0,
    avantages: [],
    etat: "",
    nbCandidats: 0,
    recruteur: "",
    etablissement: {
      nom: "",
    },
    description: "",
  });

  const [AddOffer, { isLoading }] = useAddNewOfferMutation();

  const [showDateDebut, setShowDateDebut] = useState<boolean>(false);
  const [showDateFin, setShowDateFin] = useState<boolean>(false);

  async function handleAddOffer() {
    try {
      const newOffer: Offre = await AddOffer(offer).unwrap();
      router.push(`/offers/${newOffer.id}`);
    } catch (err: any) {
      console.error("Erreur", err.message);
    }
  }

  const canSave = [
    offer.emploi,
    offer.salaire,
    offer.etablissement.nom,
    offer.description,
  ].every(Boolean);

  return (
    <View className="p-4 flex-1 justify-center">
      <Text className="text-2xl font-bold mb-4 text-center">
        Ajouter une offre
      </Text>
      <TextInput
        placeholder="Emploi"
        value={offer.emploi}
        onChangeText={(text) => setOffer({ ...offer, emploi: text })}
        className="bg-white border rounded-md px-4 py-2 mb-4 w-full"
      />
      <TextInput
        placeholder="Description"
        value={offer.description}
        onChangeText={(text) => setOffer({ ...offer, description: text })}
        className="bg-white border rounded-md px-4 py-2 mb-4 w-full"
      />
      <View className="mb-4 flex flex-row">
        <Text className="text-lg font-semibold mb-2">
          Date de début : {offer.dateDebut.toISOString().slice(0, 10)}
        </Text>
        <TouchableOpacity
          className="ml-4"
          onPress={() => setShowDateDebut(true)}
        >
          <FontAwesomeIcon size={24} icon={faCalendar} color="rgb(37 99 235)" />
        </TouchableOpacity>
      </View>
      <View className="mb-4 flex flex-row">
        <Text className="text-lg font-semibold mb-2">
          Date de fin : {offer.dateFin.toISOString().slice(0, 10)}
        </Text>
        <TouchableOpacity className="ml-4" onPress={() => setShowDateFin(true)}>
          <FontAwesomeIcon size={24} icon={faCalendar} color="rgb(37 99 235)" />
        </TouchableOpacity>
      </View>
      {showDateDebut && (
        <DateTimePicker
          value={offer.dateDebut}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowDateDebut(false);
            setOffer({ ...offer, dateDebut: date as Date });
          }}
        />
      )}
      {showDateFin && (
        <DateTimePicker
          value={offer.dateFin}
          display="default"
          mode="date"
          onChange={(_, date) => {
            setShowDateFin(false);
            setOffer({ ...offer, dateFin: date as Date });
          }}
        />
      )}
      <TextInput
        placeholder="Salaire"
        keyboardType="numeric"
        value={offer.salaire === 0 ? "" : offer.salaire.toString()}
        onChangeText={(text) =>
          setOffer({ ...offer, salaire: parseFloat(text) || 0 })
        }
        className="bg-white border rounded-md px-4 py-2 mb-4 w-full"
      />
      <TouchableOpacity
        className={`${
          canSave ? "bg-blue-500" : "bg-gray-400"
        } py-3 px-6 rounded-lg items-center`}
        onPress={handleAddOffer}
        disabled={!canSave}
      >
        <Text className="text-white font-bold text-lg">Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
