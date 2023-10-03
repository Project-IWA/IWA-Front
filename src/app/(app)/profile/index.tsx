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
    <View className="bg-white rounded-lg p-6 shadow-md m-4">
      <Text className="text-2xl font-bold mb-4">Informations du Recruteur</Text>
      <View className="flex mb-2">
        <Text className="font-semibold">Prénom: </Text>
        <Text>{user.prenom}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Nom: </Text>
        <Text>{user.nom}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Téléphone: </Text>
        <Text>{user.tel}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Adresse: </Text>
        <Text>
          {user.numRue} {user.rue},{user.codePostal} {user.ville}, {user.pays}
        </Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">SIRET: </Text>
        <Text>{user.siret}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Justificatif: </Text>
        <Text>{user.justificatif}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Formule: </Text>
        <Text>{user.formule?.nom}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Date de début: </Text>
        <Text>{user.dateDebut!.toString()}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Date de fin: </Text>
        <Text>{user.dateFin!.toString()}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Établissement: </Text>
        <Text>{user.etablissement?.nom}</Text>
      </View>
    </View>
  );
}
