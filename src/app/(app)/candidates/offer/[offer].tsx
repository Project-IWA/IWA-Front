import { useSelector } from "react-redux";
import {
  useGetCandidatesQuery,
  selectCandidatesByOffer,
} from "../candidatesApiSlice";
import { RootState } from "../../../store";
import { FlatList, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function Offers() {
  const { offer: offerId } = useLocalSearchParams() as { offer: string };

  //const { isLoading } = useGetCandidatesQuery();

  const candidats: Candidat[] = useSelector((state: RootState) =>
    selectCandidatesByOffer(state, offerId)
  );

  /*
  if (isLoading) {
    return <Text>Loading offers...</Text>;
  }
  */

  return (
    <View className="flex-1 items-center justify-center mt-12">
      <Text className="text-2xl font-bold mb-4">
        Candidats pour cette offre
      </Text>
      <FlatList<Candidat>
        className="w-full"
        data={candidats}
        keyExtractor={(item: Candidat) => item.email}
        renderItem={({ item }) => (
          <Link href={`/candidates/${item.email}`}>
            <View className="bg-white p-4 rounded-lg shadow-md ml-4">
              <Text className="text-xl font-semibold mb-2">
                {item.firstname} {item.lastname}
              </Text>
              <Text className="text-xl font-semibold mb-2">{item.email}</Text>
            </View>
          </Link>
        )}
      />
    </View>
  );
}
