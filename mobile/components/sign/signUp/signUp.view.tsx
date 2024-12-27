"use client";
import { Formik } from "formik";
import { SignUpLogic } from "./signUp.logic";
import { SignUpSchema } from "@/utils/yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ButtonAction } from "@/utils/buttons";

import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const SignUpView = () => {
  const { data, methods } = SignUpLogic();

  return (
    <>
      <Formik
        initialValues={data.initialValues}
        validationSchema={SignUpSchema}
        onSubmit={(values, actions) => methods.createUser(values, actions)}
      >
        {({ handleChange, handleSubmit, setFieldValue }) => (
          <View
            className={`flex flex-col justify-center items-center text-black bg-gray-300 h-auto w-full pt-4 pb-2 px-4 rounded-xl gap-y-3`}
          >
            <View className="h-auto w-full">
              <TextInput
                onChangeText={handleChange("firstname")}
                placeholder="firstname"
                className="h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("lastname")}
            </View>
            <View className="h-auto w-full">
              <TextInput
                onChangeText={handleChange("lastname")}
                placeholder="lastname"
                className="h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("lastname")}
            </View>
            <View className="h-auto w-full">
              <TextInput
                onChangeText={handleChange("email")}
                placeholder="email"
                keyboardType="email-address"
                className="h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              {methods.ErrorInput("email")}
            </View>
            <View className="h-auto relative w-full">
              <TextInput
                onChangeText={handleChange("password")}
                secureTextEntry={data.isPasswordHidden ? true : false}
                placeholder="password"
                className="h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
              />
              <Ionicons
                className="absolute top-1 right-1"
                name={data.isPasswordHidden ? "eye-off-outline" : "eye-outline"}
                size={32}
                color="black"
                onPress={() =>
                  methods.setIsPasswordHidden(!data.isPasswordHidden)
                }
              />
              {methods.ErrorInput("password")}
            </View>
            <View>
              <Pressable
                onPress={() => methods.setOpenDatePicker(true)}
                className="bg-blue-400 h-10 w-auto rounded-lg py-1 px-5 border-[1px] border-black"
              >
                <Text className="text-2xl">BirthDay</Text>
              </Pressable>
              {data.openDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={data.date}
                  mode={"date"}
                  is24Hour={true}
                  maximumDate={
                    new Date(
                      new Date().setUTCFullYear(new Date().getFullYear() - 18)
                    )
                  }
                  onChange={(event, date) => {
                    setFieldValue("birthDate", date);
                    methods.setOpenDatePicker(false);
                  }}
                />
              )}
            </View>
            {methods.ErrorInput("birthDate")}

            <ButtonAction
              text="Sign Up"
              action={
                handleSubmit as unknown as (e: GestureResponderEvent) => void
              }
            />
          </View>
        )}
      </Formik>

      <View className="h-14 w-full flex-row justify-center items-center ">
        <Text className="text-2xl">Already Registered? </Text>
        <Pressable onPress={() => methods.changeToSignIn()}>
          <Text className="text-2xl font-bold">Click here</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SignUpView;
