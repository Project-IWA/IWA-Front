import { View, Text } from "react-native";

interface LoadingProps {
  text: string;
}

export default function Loading({ text }: LoadingProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">{text}</Text>
    </View>
  );
}
