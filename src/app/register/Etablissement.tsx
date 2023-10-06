import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  selectCurrentRegisteringUser,
  setCurrentPage,
  setEtablissement,
} from "./registerSlice";
import {
  selectAllEtablissements,
  useGetEtablissementsQuery,
} from "../etablissements/etablissementApiSlice";
import { RootState } from "../store";
import { Select, CheckIcon } from "native-base";
import { useDispatch } from "react-redux";

export default function Etablissement() {
  const { isLoading } = useGetEtablissementsQuery();

  const etablissements: Etablissement[] = useSelector((state: RootState) =>
    selectAllEtablissements(state)
  );

  const { etablissement }: Registering = useSelector(
    selectCurrentRegisteringUser
  );

  const dispatch = useDispatch();

  const canSave = Boolean(etablissement.nom) || Boolean(etablissement.id);

  /*
  if (isLoading) {
    return <Text>Loading etablissements...</Text>;
  }
  */

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Etablissement</Text>
      <Select
        selectedValue={etablissement.id}
        minWidth="300"
        accessibilityLabel="Choisissez un établissement"
        placeholder="Choisissez un établissement"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(e) => dispatch(setEtablissement({ nom: "", id: e }))}
      >
        {etablissements.map((etab: Etablissement) => (
          <Select.Item label={etab.nom} value={etab.id!} />
        ))}
      </Select>
      <View className="items-center justify-center gap-4 mt-4 flex-row">
        <TouchableOpacity
          className="bg-black py-3 px-6 rounded-lg flex-1"
          onPress={() => dispatch(setCurrentPage(1))}
        >
          <Text className="text-white font-bold text-lg text-center">
            Retour
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            canSave ? "bg-blue-500" : "bg-gray-400"
          } py-3 px-6 rounded-lg mt-4 flex-1`}
          onPress={() => dispatch(setCurrentPage(3))}
          disabled={!canSave}
        >
          <Text className="text-white font-bold text-lg text-center">
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
