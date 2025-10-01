import React from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";

import { ButtonSubmit, Container } from "@/utils/styles";
import { UpdateProfileLogic } from "@/screens/update";
import { Colors, TextNeon } from "@/utils/fonts";

export default function Update() {
  const { data, methods } = UpdateProfileLogic();

  return (
    <>
      <TextNeon text="Update Profile2" fontSize={20} color={Colors.Neon} />
      {methods.inputModel("firstname")}
      {methods.inputModel("lastname")}
      {methods.inputPasswordModel("oldPassword")}
      {methods.inputPasswordModel("newPassword")}
      {methods.inputPasswordModel("confirmNewPassword")}
      {methods.DatePicker()}

      <ButtonSubmit
        title={data.isUpdating == true ? "Loading" : "Update"}
        onPress={methods.handleSubmit(methods.onSubmit)}
      />
      <Pressable onPress={() => router.back()}>
        <TextNeon color={Colors.Neon} text="Go back" fontSize={20} />
      </Pressable>
    </>
  );
}
