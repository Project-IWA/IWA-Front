import { Link, Redirect, Stack } from "expo-router";
import { selectCurrentUser, setUser } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useAuthQuery } from "../auth/authApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AppLayout() {
  const { data: fetchData, isLoading } = useAuthQuery();

  const user: User | null = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchData) {
      dispatch(setUser(fetchData));
    }
  }, [fetchData]);

  if (isLoading) {
    return <Text>Loading layout...</Text>;
  }

  /*
  if (!user) {
    return <Redirect href="/connect" />;
  }
  */

  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <View className="flex-row justify-around p-4 bg-white-300">
        <Link href="/offers">
          <FontAwesome5 name="list" size={24} color="black" />
        </Link>
        <Link href="/profile">
          <FontAwesome5 name="user-alt" size={24} color="black" />
        </Link>
      </View>
    </View>
  );
}
