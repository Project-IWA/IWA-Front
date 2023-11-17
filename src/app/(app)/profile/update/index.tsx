import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../auth/authSlice";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useUpdateUserMutation } from "../../../auth/usersApiSlice";
import { router } from "expo-router";
import { ScrollView } from "native-base";

export default function UpdateProfile() {
  const user: User | undefined = useSelector(selectCurrentUser) as User;

  const [newUser, setNewUser] = useState<User>(user);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  async function handleUpdateUser() {
    try {
      await updateUser(newUser).unwrap();
      router.push("/profile");
    } catch (err: any) {
      console.error(err.message);
    }
  }

  return (
    <ScrollView className="p-6">
      <Text className="text-2xl font-bold m-4 text-center">
        Modifier le profil
      </Text>
      <View className="mb-4">
        <Text className="font-semibold mb-2">Prénom:</Text>
        <TextInput
          value={newUser?.prenom}
          onChangeText={(text) => setNewUser({ ...newUser, prenom: text })}
          className="bg-gray-100 p-2 rounded-md"
        />
      </View>
      <View className="mb-4">
        <Text className="font-semibold mb-2">Nom:</Text>
        <TextInput
          value={newUser?.nom}
          onChangeText={(text) => setNewUser({ ...newUser, nom: text })}
          className="bg-gray-100 p-2 rounded-md"
        />
      </View>
      <View className="mb-4">
        <Text className="font-semibold mb-2">Téléphone:</Text>
        <TextInput
          value={newUser?.tel}
          onChangeText={(text) => setNewUser({ ...newUser, tel: text })}
          className="bg-gray-100 p-2 rounded-md"
        />
      </View>
      <TouchableOpacity
        onPress={handleUpdateUser}
        className="bg-blue-500 py-3 mt-2 px-6 rounded-md"
      >
        <Text className="text-white text-center font-bold text-xl">
          Enregistrer
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
