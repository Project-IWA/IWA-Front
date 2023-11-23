import { useSelector } from "react-redux";
import { selectCurrentRegisteringUser, setCurrentPage } from "./registerSlice";
import { useAddNewUserMutation } from "../auth/usersApiSlice";
import { setToken } from "../../utils/token";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { RootState } from "../store";
import { selectEtablissementById } from "../etablissements/etablissementApiSlice";
import { useState } from "react";
import { Snackbar } from "react-native-paper";

export default function Validation() {
  const registeringUser: Registering = useSelector(
    selectCurrentRegisteringUser
  );

  const { username, nom, prenom, tel, etablissement } = registeringUser;

  const etab: Etablissement | undefined = useSelector((state: RootState) =>
    selectEtablissementById(state, etablissement.idEtablissement!)
  );

  const dispatch = useDispatch();

  const [addNewUser, { isLoading }] = useAddNewUserMutation();

  const [snackbar, setSnackbar] = useState<string | null>(null);

  async function onRegister() {
    try {
      const logResult = await addNewUser({
        ...registeringUser,
      }).unwrap();
      const { user, accessToken, tokenType } = logResult;
      await setToken(`${tokenType} ${accessToken}`);
      dispatch(setUser({ user }));
      setSnackbar("Enregistrement réussi !");
      router.push("/home");
    } catch (err: any) {
      console.error("Error", err.message);
      setSnackbar("Erreur, enregistrement échoué !");
    }
  }

  if (isLoading) {
    return <Text>Loading enregistrement...</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Vérification</Text>
      <View className="bg-gray-100 rounded-lg p-4 mb-4 w-80">
        <Text className="text-lg font-semibold mb-2">Nom d'utilisateur: </Text>
        <Text>{username}</Text>
        <Text className="text-lg font-semibold mb-2 mt-2">Téléphone: </Text>
        <Text>{tel}</Text>
        <Text className="text-lg font-semibold mb-2 mt-2">Nom: </Text>
        <Text>{nom}</Text>
        <Text className="text-lg font-semibold mb-2 mt-2">Prénom: </Text>
        <Text>{prenom}</Text>
        <Text className="text-lg font-semibold mb-2 mt-2">Etablissement: </Text>
        <Text>{etab ? etab.nom : etablissement.nom}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" className="mt-4" />
      ) : (
        <View className="items-center justify-center gap-4 mt-4 flex-row">
          <TouchableOpacity
            className="bg-black py-3 px-6 rounded-lg flex-1"
            onPress={() => dispatch(setCurrentPage(2))}
          >
            <Text className="text-white font-bold text-lg text-center">
              Retour
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 py-3 px-6 rounded-lg flex-1"
            onPress={onRegister}
          >
            <Text className="text-white font-bold text-lg text-center">
              Terminer
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
