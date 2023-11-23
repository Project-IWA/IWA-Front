import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { selectCurrentRegisteringUser } from "./registerSlice";
import Credentials from "./Credentials";
import PersonalInfos from "./PersonalInfos";
import Etablissement from "./Etablissement";
import Validation from "./Validation";
import { View, Text } from "react-native";

function GetPage({ currentPage }: { currentPage: number }) {
  if (currentPage === 0) {
    return <Credentials />;
  }
  if (currentPage === 1) {
    return <Validation />;
  }
  return <></>
}

export default function Register() {
  const { currentPage }: Registering = useSelector(
    selectCurrentRegisteringUser
  );

  return (
    <View className="flex-1 items-center justify-center mt-16">
      <Text className="text-2xl font-bold mb-4">Bienvenue 👋</Text>
      <GetPage currentPage={currentPage} />
      <Link className="underline" href="/connect">
        Déjà un compte ? Se connecter
      </Link>
    </View>
  );
}
