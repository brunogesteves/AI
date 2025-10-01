import { Text, View, Image, Button, TextInput, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

import { Logic } from "@/screens/dashboard";
import { Controller } from "react-hook-form";
import { Colors, TextNeon } from "@/utils/fonts";

export default function Dashboard() {
  // const { data, methods } = Logic();
  return (
    <View>
      <Text>dashboard</Text>
      <Pressable onPress={() => router.navigate("/update")}>
        <TextNeon text="go Bacaaaak?" fontSize={25} color={Colors.Neon} />
      </Pressable>
    </View>
  );
}
