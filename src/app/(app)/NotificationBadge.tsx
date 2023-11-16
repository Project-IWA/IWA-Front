import React from "react";
import { View, Text } from "react-native";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { selectAllNotifications } from "./notifications/notificationsApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "expo-router";

export default function NotificationBadge({ pathname }: { pathname: string }) {
  const count: number = useSelector((state: RootState) =>
    selectAllNotifications(state)
  ).length;

  return (
    <Link href="/notifications">
      <View className="relative">
        <FontAwesomeIcon
          icon={faBell}
          size={24}
          color={pathname === "/notifications" ? "rgb(37 99 235)" : "gray"}
        />
        {count > 0 && (
          <View className="absolute top-[-5px] right-[-5px] bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            <Text className="text-white text-xs">{count}</Text>
          </View>
        )}
      </View>
    </Link>
  );
}
