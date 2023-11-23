import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useUpdateOfferMutation } from "./offersApiSlice";
import { router } from "expo-router";
import { Select, CheckIcon } from "native-base";

interface UpdateOfferProps {
  offre: Offre;
}

export default function UpdateOffer({ offre }: UpdateOfferProps) {
  const [offer, setOffer] = useState<Offre>(offre);

  const [updateOffer] = useUpdateOfferMutation();

  const [showDateDebut, setShowDateDebut] = useState<boolean>(false);
  const [showDateFin, setShowDateFin] = useState<boolean>(false);

  async function handleUpdateOffer() {
    try {
      const newOffer: Offre = await updateOffer(offer).unwrap();
      router.replace(`/offers/${newOffer.idOffre}`);
    } catch (err: any) {
      console.error("Erreur", err.message);
    }
  }

  const canSave = [
    offer.emploi,
    offer.salaire,
    offer.idEtablissement,
    offer.description,
  ].every(Boolean);

  return (
    <View className="p-4 mt-4 flex-1 justify-center">
      <Text className="text-2xl font-bold mb-4 text-center">
        Mettre à jour {offre.emploi}
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
          Date de début : {/*offer.dateDebut.toISOString().slice(0, 10)*/}
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
          Date de fin : {/*offer.dateFin.toISOString().slice(0, 10)*/}
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
      <TextInput
        placeholder="Avantages"
        value={offer.avantages}
        onChangeText={(text) => setOffer({ ...offer, avantages: text })}
        className="bg-white border rounded-md px-4 py-2 mb-4 w-full"
      />
      <Select
        selectedValue={offer.etat}
        minWidth="300"
        accessibilityLabel="Choisissez un statut"
        placeholder="Choisissez un statut"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(e) =>
          setOffer({ ...offer, etat: e as "Ouverte" | "Archivée" })
        }
      >
        <Select.Item label="Ouverte" value="Ouverte" />
        <Select.Item label="Archivée" value="Archivée" />
      </Select>
      <TouchableOpacity
        className={`${canSave ? "bg-blue-500" : "bg-gray-400"
          } py-3 px-6 mt-2 rounded-lg items-center`}
        onPress={handleUpdateOffer}
        disabled={!canSave}
      >
        <Text className="text-white font-bold text-lg">Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
