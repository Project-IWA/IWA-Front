import { Link, Redirect, Slot } from "expo-router";
import { selectCurrentUser, setUser, logOut } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthQuery } from "../auth/usersApiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import NotificationBadge from "./NotificationBadge";
import { Portal, Dialog, Button, Icon } from "react-native-paper";
import { removeToken } from "../../utils/token";

export default function AppLayout() {
  const { data: fetchData, isLoading } = useAuthQuery();

  console.log("fetchData1", fetchData);

  const user: User | null = useSelector(selectCurrentUser);

  const pathname = usePathname();

  const [dialog, setDialog] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("fetchData2", fetchData);
    if (fetchData) {
      console.log("fetchData3", fetchData);
      dispatch(setUser(fetchData));
    }
  }, [fetchData]);

  if (isLoading) {
    return <Text>Loading layout...</Text>;
  }

  if (!user) {
    return <Redirect href="/connect" />;
  }

  return (
    <View className="flex-1">
      <View className="flex-1">
        <Slot />
      </View>
      <View className="flex-row justify-around p-4 bg-white-300">
        {user.role === "Admin" ? (
          <NotificationBadge pathname={pathname} />
        ) : (
          <>
            <Link href="/offers">
              <FontAwesomeIcon
                icon={faHome}
                size={24}
                color={pathname === "/offers" ? "rgb(37 99 235)" : "gray"}
              />
            </Link>
            <Link href="/add">
              <FontAwesomeIcon
                icon={faAdd}
                size={24}
                color={pathname === "/add" ? "rgb(37 99 235)" : "gray"}
              />
            </Link>
          </>
        )}
        <Link href="/profile">
          <FontAwesomeIcon
            icon={faUser}
            size={24}
            color={pathname === "/profile" ? "rgb(37 99 235)" : "gray"}
          />
        </Link>
        <TouchableOpacity
          onPress={() => setDialog(true)}
          className="translate-y-0.5"
        >
          <Icon source="logout" size={26} color="white" />
        </TouchableOpacity>
        <Portal>
          <Dialog
            visible={dialog}
            onDismiss={() => setDialog(false)}
            style={{ borderRadius: 8 }}
          >
            <Dialog.Title className="font-bold">Déconnexion</Dialog.Title>
            <Dialog.Content>
              <Text className="text-lg">
                Voulez-vous vraiment vous déconnecter ?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                className="w-16 rounded-lg"
                onPress={() => setDialog(false)}
              >
                Non
              </Button>
              <Button
                mode="contained"
                className="w-16 rounded-lg"
                onPress={async () => {
                  setDialog(false);
                  await removeToken();
                  dispatch(logOut(undefined));
                }}
              >
                Oui
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
}
