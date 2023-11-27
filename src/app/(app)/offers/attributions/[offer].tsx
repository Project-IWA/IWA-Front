import { FlatList, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { selectOfferById } from "../offersApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button as Btn } from "native-base";
import { useState } from "react";
import { Dialog, Portal, Snackbar, Button } from "react-native-paper";
import Loading from "../../../../ui/Loading";

export default function Attributions() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  const offer: Offre | undefined = useSelector((state: RootState) =>
    selectOfferById(state, offerId)
  );

  const [note, setNote] = useState<UpdateAttribution | null>(null);

  const [snackbar, setSnackbar] = useState<string | null>(null);

  const canSave = [note?.avis, note?.note].every(Boolean);

  function changeNote(text: string) {
    if (parseFloat(text) <= 5) {
      setNote({
        ...note,
        note: parseFloat(text) || 0,
      } as UpdateAttribution);
    }
    if (text.trim() === "") {
      setNote({ ...note, note: undefined } as UpdateAttribution);
    }
  }

  if (!offer) {
    return <Loading text="Erreur, offre non trouvée" />
  }

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">
        Candidats choisis pour cette offre
      </Text>
      <FlatList<UpdateAttribution>
        className="w-full"
        data={offer.attributions}
        keyExtractor={(item: UpdateAttribution) => item.emailCandidat}
        renderItem={({ item }) => (
          <View className="p-2 m-2 bg-gray-200 rounded-lg shadow-black flex flex-col">
            <Text className="text-xl font-bold mb-2">{item.emailCandidat}</Text>
            <View className="flex flex-row">
              <Text className="text-lg font-semibold text-gray-600 mr-2">
                Etat:
              </Text>
              <Text className="text-lg text-gray-900">{item.etat}</Text>
            </View>
            {item.note && (
              <View className="flex flex-row mt-2">
                <Text className="text-lg font-semibold text-gray-600 mr-2">
                  Note:
                </Text>
                <Text className="text-lg text-gray-900">{item.note}</Text>
              </View>
            )}
            {item.avis && (
              <View className="flex flex-row mt-2">
                <Text className="text-lg font-semibold text-gray-600 mr-2">
                  Avis:
                </Text>
                <Text className="text-lg text-gray-900">{item.avis}</Text>
              </View>
            )}
            {(!item.note || !item.avis) && (
              <Btn
                onPress={() => setNote(item)}
                className="py-3 mt-2 px-6 rounded-lg bg-blue-500"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Noter le candidat
                </Text>
              </Btn>
            )}
          </View>
        )}
      />
      <Portal>
        <Dialog
          visible={note !== null}
          onDismiss={() => setNote(null)}
          style={{ borderRadius: 8 }}
        >
          <Dialog.Title className="font-bold">Noter le candidat</Dialog.Title>
          <Dialog.Content>
            <View className="mb-4">
              <Text className="font-semibold mb-2">Avis:</Text>
              <TextInput
                value={note?.avis}
                onChangeText={(text) =>
                  setNote({ ...note, avis: text } as UpdateAttribution)
                }
                className="bg-gray-100 p-2 rounded-md"
              />
            </View>
            <View className="mb-4">
              <Text className="font-semibold mb-2">Note /5:</Text>
              <TextInput
                keyboardType="numeric"
                value={
                  note?.note ? (note as UpdateAttribution).note?.toString() : ""
                }
                onChangeText={(text) => changeNote(text)}
                className="bg-gray-100 p-2 rounded-md"
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button className="w-24 rounded-lg" onPress={() => setNote(null)}>
              Annuler
            </Button>
            <Button
              mode="contained"
              className="w-16 rounded-lg"
              disabled={!canSave}
              onPress={() => {
                setNote(null);
              }}
            >
              Valider
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={snackbar !== null}
        onDismiss={() => setSnackbar(null)}
        duration={2000}
      >
        {snackbar}
      </Snackbar>
    </View>
  );
}
