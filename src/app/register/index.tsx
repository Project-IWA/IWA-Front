import { useState } from "react";
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import { useLoginMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
import { Link, router } from "expo-router";
import { setToken } from "../../utils/token";
import { useSelector } from "react-redux";
import { selectCurrentRegisteringUser } from "./registerSlice";
import Credentials from "./Credentials";
import PersonalInfos from "./PersonalInfos";
import Etablissement from "./Etablissement";

export default function Register() {
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const registeringUser: Registering = useSelector(
    selectCurrentRegisteringUser
  );

  function getPage() {
    switch (registeringUser.currentPage) {
      case 0:
        return <Credentials />;
      case 1:
        return <PersonalInfos />;
      case 2:
        return <Etablissement />;
    }
  }

  async function onRegister() {
    try {
      const logResult = await login({
        username: registeringUser.username,
        password: registeringUser.password,
      }).unwrap();
      const { user, token } = logResult;
      setToken(token);
      dispatch(setUser({ user }));
      router.push("/home");
    } catch (err: any) {
      console.error("Error", err.message);
    }
  }

  return (
    <View className="flex-1 items-center justify-center mt-16">
      <Text className="text-2xl font-bold mb-4">Bienvenue 👋</Text>
      {getPage()}
      <Link className="underline" href="/connect">
        Déjà un compte ? Se connecter
      </Link>
      {/*isLoading ? (
        <ActivityIndicator size="large" color="blue" className="mt-4" />
      ) : (
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg mt-4"
          onPress={onRegister}
        >
          <Text className="text-white font-bold text-lg">S'enregistrer</Text>
        </TouchableOpacity>
      )*/}
    </View>
  );
}
