import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { NativeBaseProvider } from "native-base";
import { PaperProvider } from "react-native-paper";

export default function AppLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NativeBaseProvider>
          <Slot />
        </NativeBaseProvider>
      </PaperProvider>
    </Provider>
  );
}
