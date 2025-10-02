import React from "react";
import { Pressable, Text, View } from "react-native";
import { Controller } from "react-hook-form";

import { ButtonSubmit, InputBox, Logotype } from "@/utils/styles";
import { Logic } from "@/screens/index";
import { Colors, CustomText } from "@/utils/fonts";
import { Redirect, router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function App() {
  const { data, methods } = Logic();
  const { session } = useAuth();
  console.log("session: ", session);
  if (session) return <Redirect href={"/dashboard"} />;
  return (
    <>
      <Logotype />

      <CustomText text="NEUROSPARK" fontSize={40} color={Colors.Neon} />
      <CustomText text="Sign In" fontSize={20} color={Colors.Neon} />

      <Controller
        control={data.control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputBox
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            hasSecureTextEntry={false}
          />
        )}
        name="email"
      />

      {data.errors.email && (
        <CustomText
          text="This is required."
          color={Colors.White}
          fontSize={20}
        />
      )}

      <Controller
        control={data.control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputBox
            placeholder="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            hasSecureTextEntry={true}
          />
        )}
        name="password"
      />
      {data.errors.password && (
        <CustomText
          text="This is required."
          color={Colors.White}
          fontSize={20}
        />
      )}
      <CustomText
        text={data.incorrectMessage ? "Email and/or password incorrect" : ""}
        color={Colors.Neon}
        fontSize={20}
      />
      <ButtonSubmit
        title={data.isLoading == true ? "Loading" : "Submit"}
        onPress={methods.handleSubmit(methods.onSubmit)}
      />
      <Pressable onPress={() => router.back()}>
        <CustomText
          text="Don´t thave account?"
          fontSize={25}
          color={Colors.Neon}
        />
      </Pressable>
    </>
  );
}
