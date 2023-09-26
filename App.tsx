import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./src/features/api/apiSlice";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NativeRouter as Router, Routes, Route } from "react-router-native";

export default function App() {
  return (
    <Provider store={store}>
      <ApiProvider api={apiSlice}>
        <View>
          <Router>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>
          <StatusBar style="auto" />
        </View>
      </ApiProvider>
    </Provider>
  );
}
