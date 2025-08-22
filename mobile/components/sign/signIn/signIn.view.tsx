import { SignInSchema } from "@/utils/yup";
import { Formik } from "formik";
import { SignInLogic } from "./signIn.logic";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { ButtonAction } from "@/utils/buttons";

const SignInView = () => {
  const { data, methods } = SignInLogic();
  return (
    <>
      <Formik
        initialValues={data.initialValues}
        // validationSchema={SignInSchema}
        onSubmit={(values, actions) => {
          methods.loginUser(values, actions);
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <View
            className={`flex flex-col justify-center items-center text-black bg-gray-300 h-auto w-full pt-4 pb-2 px-4 rounded-xl gap-y-3`}
          >
            <View className="h-auto w-full ">
              <TextInput
                onChangeText={handleChange("email")}
                keyboardType="email-address"
                placeholder="Email"
                className=" h-18 rounded-lg pl-2 placeholder:text-black border-[1px] border-black w-full"
              />
              {methods.ErrorInput("email")}
            </View>
            <View className="h-auto relative w-full">
              <TextInput
                onChangeText={handleChange("password")}
                secureTextEntry={data.isPasswordHidden ? true : false}
                placeholder="Password"
                className="h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              <View className="absolute top-2 right-2">
                <Ionicons
                  name={
                    data.isPasswordHidden ? "eye-off-outline" : "eye-outline"
                  }
                  size={32}
                  color="black"
                  onPress={() =>
                    methods.setIsPasswordHidden(!data.isPasswordHidden)
                  }
                />
              </View>
              <View className="mt-1">{methods.ErrorInput("password")}</View>
            </View>
            <View>
              <Text
                className={`text-xs text-red-500 ${
                  data.errorWarning ? "" : "hidden"
                }`}
              >
                email and/or password wrong
              </Text>
            </View>
            <ButtonAction
              text="Sign in"
              action={
                handleSubmit as unknown as (e: GestureResponderEvent) => void
              }
            />
          </View>
        )}
      </Formik>
      <View className=" w-full flex-row justify-center items-center mt-5 h-10">
        <Text className="text-2xl">Not Registered Yet? </Text>
        <Pressable className="text-sm" onPress={() => methods.changeToSignUp()}>
          <Text className="text-2xl font-bold">Click here.</Text>
        </Pressable>
      </View>
    </>
  );
};
export default SignInView;
