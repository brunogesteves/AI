import React from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";

import { ButtonSubmit } from "@/utils/styles";

import { Colors, CustomText } from "@/utils/fonts";
import { SignUpLogic } from "@/screens/signup";

export default function Update() {
  const { data, methods } = SignUpLogic();

  return (
    <>
      <CustomText text="Sign Up" fontSize={20} color={Colors.Neon} />
      {methods.inputModel("firstname")}
      {methods.inputModel("lastname")}
      {methods.inputModel("email")}
      {methods.inputPasswordModel("password")}
      {methods.inputPasswordModel("confirmPassword")}
      {methods.DatePicker()}

      <ButtonSubmit
        title={data.isUpdating == true ? "Loading" : "Sign Up"}
        onPress={methods.handleSubmit(methods.onSubmit)}
      />
      <Pressable onPress={() => router.back()}>
        <CustomText color={Colors.Neon} text="Go back" fontSize={20} />
      </Pressable>
    </>
  );
}
