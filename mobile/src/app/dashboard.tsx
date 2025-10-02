import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";

import { DashBoardLogic } from "@/screens/dashboard";
import { Controller } from "react-hook-form";
import { Colors, CustomText } from "@/utils/fonts";
import { useAuth } from "@/contexts/AuthContext";
import { ButtonAction } from "@/utils/buttons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Dashboard() {
  const { data, methods } = DashBoardLogic();
  const { session, user } = useAuth();
  if (!session) return <Redirect href={"/"} />;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "100%",
          marginBottom: 10,
        }}
      >
        <CustomText text="Welcome" fontSize={25} color={Colors.White} />
        <CustomText
          text={data?.userSettings?.firstname ?? ""}
          fontSize={25}
          color={Colors.Neon}
        />

        <CustomText
          text={data?.userSettings?.lastname ?? ""}
          fontSize={25}
          color={Colors.Neon}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 30,
          rowGap: 10,
          width: "100%",
        }}
      >
        <ButtonAction
          action={() => alert("oi")}
          text="Update Profile"
          icon={
            <Ionicons
              name={"refresh-outline"}
              size={32}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          }
        />
        <ButtonAction
          action={() => alert("oi")}
          text="Create Project"
          icon={
            <Ionicons
              name={"create-outline"}
              size={32}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          }
        />
        <ButtonAction
          action={() => alert("oi")}
          text="Logout"
          icon={
            <Ionicons
              name={"log-out-outline"}
              size={32}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          }
        />
      </View>
      <View style={{ width: "100%", flex: 1, backgroundColor: "red" }}>
        <FlatList
          data={data.allProJects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: "100%", backgroundColor: "red" }}>
              <CustomText color={Colors.White} fontSize={10} text={item.name} />
            </View>
          )}
        />
      </View>
    </>
  );
}
