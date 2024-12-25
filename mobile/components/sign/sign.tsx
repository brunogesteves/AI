import { useState } from "react";
import { Text, View } from "react-native";
import SignUp from "./signUp/signUp.view";
import SignIn from "./signIn/signIn.view";
import { useInfoIUserSettingsInfo } from "@/contexts/contextUser";

const Sign = () => {
  const { isRegistered } = useInfoIUserSettingsInfo();

  return (
    <View className="flex-1 bg-yellow-500 flex justify-center items-center px-5">
      {isRegistered ? <SignUp /> : <SignIn />}
    </View>
  );
};

export default Sign;
