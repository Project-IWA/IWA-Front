import { Routes, Route } from "react-router-native";
import Layout from "./Layout";
import { Text } from "react-native";
import { Suspense } from "react";
import RequireAuth from "../features/auth/RequireAuth";
import Home from "./Home";

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={/*<Layout />*/ <Home />}>
        {/** Public routes */}
        <Route
          path="connect"
          //element={/!user ? <Login /> : <Navigate to="/" />}
        />
        {/** Private routes */}
        <Route
          element={
            <Suspense fallback={<Text>Loading...</Text>}>
              <RequireAuth />
            </Suspense>
          }
        >
          {/*</Route><Route index path="/" element={<EspacePersonnel />} />*/}
        </Route>
      </Route>
    </Routes>
  );
}
