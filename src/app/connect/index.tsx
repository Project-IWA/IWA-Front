import { useRef } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLoginMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
import { router } from "expo-router";

export default function Connect() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  async function onLogin() {
    try {
      const logResult = await login({
        username: (usernameRef.current as any).value,
        password: (passwordRef.current as any).value,
      }).unwrap();
      const { user, token } = logResult;
      localStorage.setItem("token", token);
      dispatch(setUser({ user }));
      router.replace("/home");
    } catch (err: any) {
      console.log("Error", err.error);
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Bienvenue</Text>
      <TextInput
        ref={usernameRef}
        placeholder="Adresse mail"
        autoCapitalize="none"
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      <TextInput
        ref={passwordRef}
        placeholder="Mot de passe"
        secureTextEntry
        className="bg-white border rounded-md px-4 py-2 mb-4 w-80"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" className="mt-4" />
      ) : (
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg mt-4"
          onPress={onLogin}
        >
          <Text className="text-white font-bold text-lg">Connexion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
