import { View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import {
  selectCurrentRegisteringUser,
  setCurrentPage,
  setPassword,
  setPassword2,
  setUsername,
} from "./registerSlice";
import { useDispatch } from "react-redux";

export default function Credentials() {
  const { username, password, password2 }: Registering = useSelector(
    selectCurrentRegisteringUser
  );

  const dispatch = useDispatch();

  const canSave =
    [username, password, password2].every(Boolean) &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username) &&
    password === password2;

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Informations de connexion</Text>
      <TextInput
        value={username}
        onChangeText={(text) => dispatch(setUsername(text))}
        placeholder="Adresse mail"
        autoCapitalize="none"
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TextInput
        value={password}
        onChangeText={(text) => dispatch(setPassword(text))}
        placeholder="Mot de passe"
        secureTextEntry
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TextInput
        value={password2}
        onChangeText={(text) => dispatch(setPassword2(text))}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TouchableOpacity
        className={`${
          canSave ? "bg-blue-500" : "bg-gray-400"
        } py-3 px-6 rounded-lg mt-4`}
        onPress={() => dispatch(setCurrentPage(1))}
        disabled={!canSave}
      >
        <Text className="text-white font-bold text-lg">Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}
