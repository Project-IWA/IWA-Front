import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  selectCurrentRegisteringUser,
  setCurrentPage,
  setNom,
  setPrenom,
  setTel,
} from "./registerSlice";
import { useDispatch } from "react-redux";

export default function PersonalInfos() {
  const { nom, prenom, tel }: Registering = useSelector(
    selectCurrentRegisteringUser
  );

  const dispatch = useDispatch();

  const canSave = [nom, prenom, tel].every(Boolean) && /^\d{10}$/.test(tel);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Informations personnelles</Text>
      <TextInput
        value={prenom}
        onChangeText={(text) => dispatch(setPrenom(text))}
        placeholder="Prenom"
        autoCapitalize="none"
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TextInput
        value={nom}
        onChangeText={(text) => dispatch(setNom(text))}
        placeholder="Nom"
        autoCapitalize="none"
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TextInput
        value={tel}
        onChangeText={(text) => dispatch(setTel(text))}
        placeholder="Téléphone"
        autoCapitalize="none"
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TouchableOpacity
        className={`${
          canSave ? "bg-blue-500" : "bg-gray-400"
        } py-3 px-6 rounded-lg mt-4`}
        onPress={() => dispatch(setCurrentPage(2))}
      >
        <Text className="text-white font-bold text-lg">Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}
