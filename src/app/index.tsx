import { View, Text } from "react-native";
import { Link, Redirect } from "expo-router";
import { User } from "../models/user";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/authSlice";

export default function Home() {
  const user: User | null = useSelector(selectCurrentUser);

  if (!user) {
    return <Redirect href="/connect" />;
  }

  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-red-300">Bienvenue sur l'application</Text>
      <Link href="/test">
        <Text>Voyager</Text>
      </Link>
    </View>
  );
}
