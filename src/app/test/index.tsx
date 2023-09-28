import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-red-600">Test</Text>
      <Link href="/">
        <Text>RETOUR</Text>
      </Link>
    </View>
  );
}
