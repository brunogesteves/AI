import { Text, View, Image, Button, TextInput } from "react-native";
import React from "react";
import { router } from "expo-router";

import { Bg } from "@/utils/styles";
import { Logic } from "@/logic/dashboard";
import { Controller } from "react-hook-form";

export default function Dashboard() {
  // const { data, methods } = Logic();
  return (
    <Bg>
      <Text>dashboard</Text>
    </Bg>
  );
}
