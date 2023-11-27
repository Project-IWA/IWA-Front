import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  selectCurrentRegisteringUser,
  setCurrentPage,
  setFormule,
} from "./registerSlice";
import { useDispatch } from "react-redux";
import { Select, CheckIcon } from "native-base";
import {
  selectAllFormules,
  useGetFormulesQuery,
} from "../formules/formulesApiSlice";
import { RootState } from "../store";
import Loading from "../../ui/Loading";

export default function Formule() {
  const { formule }: Registering = useSelector(selectCurrentRegisteringUser);

  const { isLoading } = useGetFormulesQuery();

  const formules: Formule[] = useSelector((state: RootState) =>
    selectAllFormules(state)
  );

  const dispatch = useDispatch();

  const canSave = [formule].every(Boolean);

  if (isLoading) {
    return <Loading text="Loading formules..." />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Formule</Text>
      <Select
        selectedValue={formule}
        minWidth="300"
        accessibilityLabel="Choisissez une formule"
        placeholder="Choisissez une formule"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(e) => dispatch(setFormule(e))}
      >
        {formules.map((form: Formule) => (
          <Select.Item label={form.typeFormule} value={form.idFormule} />
        ))}
      </Select>
      <View className="items-center justify-center gap-4 mt-4 flex-row">
        <TouchableOpacity
          className="bg-black py-3 px-6 rounded-lg"
          onPress={() => dispatch(setCurrentPage(1))}
        >
          <Text className="text-white text-center font-bold text-lg">
            Retour
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            canSave ? "bg-blue-500" : "bg-gray-400"
          } py-3 px-6 rounded-lg`}
          onPress={() => dispatch(setCurrentPage(3))}
          disabled={!canSave}
        >
          <Text className="text-white text-center font-bold text-lg">
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
