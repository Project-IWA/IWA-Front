import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { NativeBaseProvider } from "native-base";

export default function AppLayout() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Slot />
      </NativeBaseProvider>
    </Provider>
  );
}
