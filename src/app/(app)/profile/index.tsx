import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { View, Text } from "react-native";

export default function Profile() {
  const user: User | null = useSelector(selectCurrentUser) as User;

  if (user.role === "Administrator") {
    return (
      <View>
        <Text className="text-2xl font-bold mb-4">{user.role}</Text>
        <Text className="text-lg font-semibold mb-2">Mail :</Text>
        <Text>{user.mail}</Text>
      </View>
    );
  }

  const recruiter = user.recruiter as Recruiter;
  const {
    prenom,
    nom,
    tel,
    addresse,
    siret,
    justificatif,
    formule,
    dateDebut,
    dateFin,
    etablissement,
  } = recruiter;
  const { streetNum, street, complement, zipCode, city, country } = addresse;
  const { nom: etablissementNom } = etablissement;
  const { type: formuleType } = formule;

  return (
    <View className="bg-white rounded-lg p-6 shadow-md m-4">
      <Text className="text-2xl font-bold mb-4">Informations du Recruteur</Text>
      <View className="flex mb-2">
        <Text className="font-semibold">Prénom: </Text>
        <Text>{prenom}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Nom: </Text>
        <Text>{nom}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Téléphone: </Text>
        <Text>{tel}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Adresse: </Text>
        <Text>
          {streetNum} {street}, {complement && `${complement}, `}
          {zipCode} {city}, {country}
        </Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">SIRET: </Text>
        <Text>{siret}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Justificatif: </Text>
        <Text>{justificatif}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Formule: </Text>
        <Text>{formuleType}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Date de début: </Text>
        <Text>{dateDebut.toString()}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Date de fin: </Text>
        <Text>{dateFin.toString()}</Text>
      </View>
      <View className="flex mb-2">
        <Text className="font-semibold">Établissement: </Text>
        <Text>{etablissementNom}</Text>
      </View>
    </View>
  );
}
