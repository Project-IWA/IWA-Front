import { useRef } from "react";
import { ActivityIndicator, Button, TextInput, View } from "react-native";
import { useLoginMutation } from "../auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/authSlice";
//import { router } from "expo-router";

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
      //router.replace("/home");
    } catch (err: any) {
      console.log("Error", err.error);
    }
  }

  return (
    <View>
      <TextInput
        ref={usernameRef}
        placeholder="Adresse mail"
        autoCapitalize="none"
      />
      <TextInput ref={passwordRef} placeholder="Mot de passe" secureTextEntry />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Connexion" color="blue" onPress={onLogin} />
      )}
    </View>
  );
}
