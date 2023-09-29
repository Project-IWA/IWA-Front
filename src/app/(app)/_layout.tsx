import { Redirect, Stack } from "expo-router";
import { selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { User } from "../../models/user";

export default function AppLayout() {
  const user: User | null = useSelector(selectCurrentUser);

  if (!user) {
    return <Redirect href="/connect" />;
  }

  return <Stack />;
}
