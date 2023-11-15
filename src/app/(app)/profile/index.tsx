import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { View, Text } from "react-native";

export default function Profile() {
  const user: User | null = useSelector(selectCurrentUser) as User;

  if (user.roles.some((role) => role.name === "Admin")) {
    return (
      <View>
        <Text className="text-2xl font-bold mb-4">{user.roles.join(" ")}</Text>
        <Text className="text-lg font-semibold mb-2">Mail :</Text>
        <Text>{user.email}</Text>
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
        <Text className="font-semibold">SIRET: {user.numeroSiret}</Text>
        <Text className="font-semibold">
          Justificatif: {user.docJustificatif}
        </Text>
      </View>
      <View className="mb-4">
        <Text className="font-semibold">
          Formule: {user.formule?.typeFormule}
        </Text>
        <Text className="font-semibold">
          Début: {user.dateDebutSouscription?.toISOString().slice(0, 10)}
        </Text>
        <Text className="font-semibold">
          Fin: {user.dateFinSouscription?.toISOString().slice(0, 10)}
        </Text>
      </View>
      {user.etablissementPrincipal && (
        <View className="mb-4">
          <Text className="font-semibold">
            Établissement: {user.etablissementPrincipal?.nom}
          </Text>
        </View>
      )}
    </View>
  );
}
