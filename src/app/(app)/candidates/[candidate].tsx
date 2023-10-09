import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectCandidateById } from "./candidatesApiSlice";
import { View, Text } from "react-native";

export default function Offer() {
  const { candidate: candidateId } = useLocalSearchParams() as {
    candidate: string;
  };

  const candidat: Candidat | undefined = useSelector((state: RootState) =>
    selectCandidateById(state, candidateId)
  );

  if (!candidat) {
    return <Text>Erreur, candidat non trouvé</Text>;
  }

  return (
    <View className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center mt-8">
      <Text className="text-3xl font-bold mb-4">
        {candidat.firstname} {candidat.lastname}
      </Text>
      <Text className="text-3xl font-bold mb-4">{candidat.email}</Text>
    </View>
  );
}
