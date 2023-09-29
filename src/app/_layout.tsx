import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { Text } from "react-native";

export default function AppLayout() {
  return (
    <Provider store={store}>
      <Text>OKOK</Text>
      <Slot />
    </Provider>
  );
}
