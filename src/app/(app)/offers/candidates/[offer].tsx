import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { selectAllMatchings, useGetMatchingsQuery } from "./matchingsApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Button as Btn } from "native-base";
import { Portal, Dialog, Button, Snackbar } from "react-native-paper";
import { useState } from "react";
import { useAddNewAttributionMutation } from "../attributions/attributionsApiSlice";
import Loading from "../../../../ui/Loading";
import { useGetOffersQuery } from "../offersApiSlice";

export default function Matchings() {
  const { offerId } = useLocalSearchParams() as { offerId: string };

  const { isLoading: loadingOffre } = useGetOffersQuery();

  const { isLoading: loadingMatchings } = useGetMatchingsQuery({ offerId });

  const matchings: Matching[] = useSelector((state: RootState) =>
    selectAllMatchings(state)
  );

  const [dialogAccept, setDialogAccept] = useState<AddAttribution | null>(null);

  const [snackbar, setSnackbar] = useState<string | null>(null);

  const [addNewAttribution] = useAddNewAttributionMutation();

  async function handleAddNewAttribution() {
    try {
      await addNewAttribution(dialogAccept).unwrap();
      setSnackbar("Candidat accepté !");
    } catch (err: any) {
      console.error(err.message);
      setSnackbar("Erreur, candidat non accepté");
    }
  }

  if (loadingOffre || loadingMatchings) {
    return <Loading text="Loading candidats" />;
  }

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">
        Candidats pour cette offre
      </Text>
      <FlatList<Matching>
        className="w-full"
        data={matchings}
        keyExtractor={(item: Matching) => item.emailCandidat}
        renderItem={({ item }) => (
          <View className="p-2 m-2 bg-gray-200 rounded-lg shadow-black flex flex-col">
            <Text className="text-xl font-bold">{item.emailCandidat}</Text>
            <Btn
              onPress={() =>
                setDialogAccept({
                  etat: "En cours",
                  idOffre: item.idOffre,
                  emailCandidat: item.emailCandidat,
                })
              }
              className="py-3 mt-2 px-6 rounded-lg bg-blue-500"
            >
              <Text className="text-white text-center font-bold text-lg">
                Accepter
              </Text>
            </Btn>
          </View>
        )}
      />
      <Portal>
        <Dialog
          visible={dialogAccept !== null}
          onDismiss={() => setDialogAccept(null)}
          style={{ borderRadius: 8 }}
        >
          <Dialog.Title className="font-bold">
            Accepter le candidat
          </Dialog.Title>
          <Dialog.Content>
            <Text className="text-lg">
              Voulez-vous vraiment accepter le candidat ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              className="w-16 rounded-lg"
              onPress={() => setDialogAccept(null)}
            >
              Non
            </Button>
            <Button
              mode="contained"
              className="w-16 rounded-lg"
              onPress={handleAddNewAttribution}
            >
              Oui
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
