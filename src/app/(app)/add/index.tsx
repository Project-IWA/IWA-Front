import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useAddNewOfferMutation } from "../offers/offersApiSlice";
import { router } from "expo-router";
import { Snackbar, Portal, Dialog, Icon, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import {
  selectAllTypeEmplois,
  useGetTypeEmploisQuery,
} from "./typeEmploisApiSlice";
import {
  selectAllEtablissements,
  useAddNewEtablissementMutation,
  useGetEtablissementsQuery,
} from "../../etablissements/etablissementApiSlice";
import { RootState } from "../../store";
import Loading from "../../../ui/Loading";
import { CheckIcon, Select } from "native-base";

export default function NewOffer() {
  const user: User | undefined = useSelector(selectCurrentUser) as User;

  const { isLoading: loadindTypeEmplois } = useGetTypeEmploisQuery();

  const { isLoading: loadingEtablissements } = useGetEtablissementsQuery();

  const typeEmplois = useSelector((state: RootState) =>
    selectAllTypeEmplois(state)
  );

  const etablissements = useSelector((state: RootState) =>
    selectAllEtablissements(state)
  );

  const [dialogEtablissement, setDialogEtablissement] = useState<string | null>(
    null
  );

  const [offer, setOffer] = useState<AddOffre>({
    emploi: "",
    dateDebut: new Date(),
    dateFin: new Date(),
    salaire: 0,
    avantages: "",
    etat: "Ouverte",
    nombreCandidats: 0,
    idEtablissement: "",
    description: "",
    idTypeEmploi: "",
    idUser: user.idUser,
  });

  const [AddOffer] = useAddNewOfferMutation();

  const [showDateDebut, setShowDateDebut] = useState<boolean>(false);
  const [showDateFin, setShowDateFin] = useState<boolean>(false);

  const [snackbar, setSnackbar] = useState<string | null>(null);

  const [addNewEtablissement] = useAddNewEtablissementMutation();

  async function handleAddOffer() {
    try {
      const newOffer: Offre = await AddOffer(offer).unwrap();
      setSnackbar("Offre ajoutée !");
      router.push("/offers");
    } catch (err: any) {
      console.error("Erreur", err.message);
      setSnackbar("Erreur, offre non ajoutée");
    }
  }

  async function handleAddNewEtablissement() {
    try {
      await addNewEtablissement({
        nom: dialogEtablissement as string,
      }).unwrap();
      setSnackbar("Etablissement ajouté !")
    } catch (err: any) {
      console.error("Erreur", err.message);
      setSnackbar("Erreur, établissement non créé");
    }
  }

  const canSave = [
    offer.emploi,
    offer.salaire,
    offer.idEtablissement,
    offer.description,
  ].every(Boolean);

  if (loadindTypeEmplois || loadingEtablissements) {
    return <Loading text="Loading informations..." />;
  }

  return (
    <View className="p-4 flex-1 justify-center">
      <Text className="text-2xl font-bold mb-4 text-center">
        Ajouter une offre
      </Text>
      <Select
        selectedValue={offer.idEtablissement}
        minWidth="300"
        accessibilityLabel="Choisissez un Etablissement"
        placeholder="Choisissez un etablissement"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(e) => setOffer({ ...offer, idEtablissement: e })}
      >
        <Select.Item label="" value="" />
        {etablissements.map((etablissement) => (
          <Select.Item
            label={etablissement.nom}
            value={etablissement.idEtablissement}
          />
        ))}
      </Select>
      <TouchableOpacity
        className="bg-blue-500 py-3 px-6 rounded-lg items-center my-2"
        onPress={() => setDialogEtablissement("")}
      >
        <Text className="text-white font-bold text-lg">
          Ajouter un établissement
        </Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Emploi"
        value={offer.emploi}
        onChangeText={(text) => setOffer({ ...offer, emploi: text })}
        className="bg-white border rounded-md px-4 py-2 mb-4 w-full"
      />
      <Select
        selectedValue={offer.idTypeEmploi}
        minWidth="300"
        className="mb-2"
        accessibilityLabel="Choisissez un type d'emploi"
        placeholder="Choisissez un type d'emploi"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(e) => setOffer({ ...offer, idTypeEmploi: e })}
      >
        <Select.Item label="" value="" />
        {typeEmplois.map((type) => (
          <Select.Item label={type.nom} value={type.idTypeEmploi} />
        ))}
      </Select>
      <TextInput
        placeholder="Description"
        value={offer.description}
        onChangeText={(text) => setOffer({ ...offer, description: text })}
        className="bg-white border rounded-md px-4 py-2 my-4 w-full"
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
      <TextInput
        placeholder="Avantages"
        value={offer.avantages}
        onChangeText={(text) => setOffer({ ...offer, avantages: text })}
        className="bg-white border rounded-md px-4 py-2 mb-4 w-full"
      />
      <TouchableOpacity
        className={`${canSave ? "bg-blue-500" : "bg-gray-400"
          } py-3 px-6 rounded-lg items-center`}
        onPress={handleAddOffer}
        disabled={!canSave}
      >
        <Text className="text-white font-bold text-lg">Valider</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackbar !== null}
        onDismiss={() => setSnackbar(null)}
        duration={2000}
      >
        {snackbar}
      </Snackbar>
      <Portal>
        <Dialog
          visible={dialogEtablissement !== null}
          onDismiss={() => setDialogEtablissement(null)}
          style={{ borderRadius: 8 }}
        >
          <Dialog.Title className="font-bold">
            Nouvel établissement
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              placeholder="Etablissement"
              value={dialogEtablissement as string}
              onChangeText={(text) => setDialogEtablissement(text)}
              className="bg-white border rounded-md px-4 py-2 mb-4 w-full"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              className="w-16 rounded-lg"
              onPress={() => setDialogEtablissement(null)}
            >
              Annuler
            </Button>
            <Button
              mode="contained"
              className="w-16 rounded-lg"
              onPress={async () => {
                setDialogEtablissement(null);
                handleAddNewEtablissement();
              }}
            >
              Valider
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
