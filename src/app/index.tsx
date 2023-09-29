import { View, Text } from "react-native";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { selectCurrentUser, setUser } from "./auth/authSlice";
import { useAuthQuery } from "./auth/authApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const { data: fetchData, isLoading } = useAuthQuery();

  const user: User | null = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchData) {
      dispatch(setUser(fetchData));
    }
  }, [fetchData]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/connect" />;
  }

  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-red-300">Bienvenue sur l'application</Text>
    </View>
  );
}
