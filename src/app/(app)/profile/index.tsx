import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { View, Text } from "react-native";

export default function Profile() {
  const user: User | null = useSelector(selectCurrentUser) as User;

  if (user.role === "Admin") {
    return (
      <View>
        <Text className="text-2xl font-bold mb-4">{user.role}</Text>
        <Text className="text-lg font-semibold mb-2">Mail :</Text>
        <Text>{user.mail}</Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-lg p-6 shadow-md m-4 mt-12">
      <View className="flex justify-center items-center">
        <Text className="text-2xl font-bold mb-4">
          {user.prenom} {user.nom}
        </Text>
      </View>
      <View className="mb-4">
        <Text>{user.tel}</Text>
        <Text>
          {user.numRue} {user.rue}, {user.codePostal} {user.ville}, {user.pays}
        </Text>
      </View>
      <View className="mb-4">
        <Text className="font-semibold">SIRET: {user.siret}</Text>
        <Text className="font-semibold">Justificatif: {user.justificatif}</Text>
      </View>
      <View className="mb-4">
        <Text className="font-semibold">Formule: {user.formule?.nom}</Text>
        <Text className="font-semibold">
          Début: {user.dateDebut?.toISOString().slice(0, 10)}
        </Text>
        <Text className="font-semibold">
          Fin: {user.dateFin?.toISOString().slice(0, 10)}
        </Text>
      </View>
      {user.etablissement && (
        <View className="mb-4">
          <Text className="font-semibold">
            Établissement: {user.etablissement?.nom}
          </Text>
        </View>
      )}
    </View>
  );
}
