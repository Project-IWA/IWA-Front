import { useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLoginMutation } from "../auth/usersApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
import { Link, router } from "expo-router";
import { setToken } from "../../utils/token";

export default function Connect() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  async function onLogin() {
    try {
      const logResult = await login({
        username,
        password,
      }).unwrap();
      const { user, token } = logResult;
      setToken(token);
      dispatch(setUser({ user }));
      router.push("/home");
    } catch (err: any) {
      console.error("Error", err.message);
    }
  }

  const canSave = [username, password].every(Boolean);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Salut 👋</Text>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Adresse mail"
        autoCapitalize="none"
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Mot de passe"
        secureTextEntry
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <Link className="underline" href="/register">
        Pas de compte ? S'enregistrer
      </Link>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" className="mt-4" />
      ) : (
        <TouchableOpacity
          className={`${
            canSave ? "bg-blue-500" : "bg-gray-400"
          } py-3 px-6 rounded-lg mt-4`}
          onPress={onLogin}
          disabled={!canSave}
        >
          <Text className="text-white font-bold text-lg">Connexion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
