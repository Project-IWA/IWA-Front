import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function OffersRedirect() {
  const user = useSelector(selectCurrentUser) as User;

  return user.role === "Admin" ? (
    <Redirect href="/notifications" />
  ) : (
    <Redirect href="/offers" />
  );
}
