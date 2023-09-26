import { useLocation, Navigate, Outlet } from "react-router-native";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "./authSlice";

type User = {};

function RequireAuth() {
  const user: User | null = useSelector(selectCurrentUser);
  const location = useLocation();
  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/connect" state={{ from: location }} />
  );
}

export default RequireAuth;
