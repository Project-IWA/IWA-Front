import { Link, Redirect, Stack } from "expo-router";
import { selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AppLayout() {
  const user: User | null = useSelector(selectCurrentUser);

  /*
  if (!user) {
    return <Redirect href="/connect" />;
  }
  */

  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <View className="flex-row justify-around p-4 bg-gray-300">
        <Link href="/offers">
          <FontAwesome5 name="Vos offres" size={24} color="blue" />
        </Link>
        <Link href="/profile">
          <FontAwesome5 name="Profil" size={24} color="green" />
        </Link>
      </View>
    </View>
  );
}
