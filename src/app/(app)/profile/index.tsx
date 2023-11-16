import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Profile() {
  const user: User | null = useSelector(selectCurrentUser) as User;

  return (
    <View className="bg-white rounded-lg p-6 shadow-md m-4 mt-12">
      <View className="flex justify-center items-center mb-4">
        <Text className="text-3xl font-bold text-blue-500">
          {user.prenom} {user.nom}
        </Text>
        <Text className="text-3xl font-bold mb-4">
          {user.roles.map((role) => role.name).join(" ")}
        </Text>
      </View>
      <View className="mb-4">
        <View className="mb-4">
          <Text>{user.email}</Text>
        </View>
        <Text className="text-gray-700">{user.tel}</Text>
        <Text className="text-gray-700">
          {user.numRue} {user.rue}, {user.codePostal} {user.ville}, {user.pays}
        </Text>
      </View>
      <View className="mb-4">
        <Text className="font-semibold text-gray-800">
          SIRET: {user.numeroSiret}
        </Text>
      </View>
      <View className="mb-4">
        <Text className="font-semibold text-blue-500">
          Formule: {user.formule?.typeFormule}
        </Text>
        <Text className="font-semibold text-blue-500">
          Début: {user.dateDebutSouscription?.toISOString().slice(0, 10)}
        </Text>
        <Text className="font-semibold text-blue-500">
          Fin: {user.dateFinSouscription?.toISOString().slice(0, 10)}
        </Text>
      </View>
      {user.etablissementPrincipal && (
        <View className="mb-4">
          <Text className="font-semibold text-blue-500">
            Établissement: {user.etablissementPrincipal?.nom}
          </Text>
        </View>
      )}
      <Link
        className="text-white bg-blue-500 py-3 mt-2 px-6 rounded-lg"
        href="/profile/update"
      >
        <Text className="text-white text-center font-bold text-lg">
          Modifier le profil
        </Text>
      </Link>
    </View>
  );
}
