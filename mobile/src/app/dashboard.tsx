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
  const { session } = useAuth();
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
          action={() => methods.updateProfile()}
          text="Update Profile"
          fontSize={20}
          icon={
            <Ionicons
              name={"refresh-outline"}
              size={32}
              color="#fff"
              style={{ marginRight: 10, marginTop: 5 }}
            />
          }
        />
        <ButtonAction
          action={() => alert("oi")}
          text="Create Project"
          fontSize={20}
          icon={
            <Ionicons
              name={"create-outline"}
              size={32}
              color="#fff"
              style={{ marginRight: 10, marginTop: 5 }}
            />
          }
        />
        <ButtonAction
          action={() => methods.logOut()}
          fontSize={20}
          text="Logout"
          icon={
            <Ionicons
              name={"log-out-outline"}
              size={32}
              color="#fff"
              style={{ marginRight: 10, marginTop: 5 }}
            />
          }
        />
      </View>
      <View style={{ width: "100%" }}>
        {data.allProJects.map((item) => (
          <View
            key={item.id}
            style={{
              width: "100%",
              marginVertical: 5,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Ionicons
                name={"folder-outline"}
                size={20}
                color="#fff"
                style={{ marginTop: 10, marginEnd: 10 }}
              />
              <CustomText color={Colors.White} fontSize={20} text={item.name} />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 20,
              }}
            >
              <ButtonAction
                text="Open"
                action={() => alert("oi")}
                fontSize={15}
                icon={
                  <Ionicons
                    name={"open-outline"}
                    size={20}
                    color="#fff"
                    style={{ marginRight: 10, marginTop: 7 }}
                  />
                }
              />
              <ButtonAction
                text="Delete"
                action={() => alert("oi")}
                fontSize={15}
                icon={
                  <Ionicons
                    name={"trash-outline"}
                    size={20}
                    color="#fff"
                    style={{ marginRight: 10, marginTop: 7 }}
                  />
                }
              />
            </View>
          </View>
        ))}
      </View>
    </>
  );
}
