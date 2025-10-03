import React, { useState } from "react";

import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, CustomText, orbitronFont } from "./fonts";
import * as SplashScreen from "expo-splash-screen";

import { ButtonSubmitProps, IInputBoxProps } from "./types";

SplashScreen.preventAutoHideAsync();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { height: 250, width: 400 },
});

export const Logotype = () => {
  return (
    <Image
      source={require("./../../assets/images/logotype.png")}
      style={styles.logo}
    />
  );
};

export const InputBox = ({
  placeholder,
  onBlur,
  onChangeText,
  value,
  hasSecureTextEntry,
}: IInputBoxProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  orbitronFont();

  return (
    <View
      style={{
        width: "90%",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        gap: 10,
      }}
    >
      <TextInput
        secureTextEntry={
          hasSecureTextEntry ? (isPasswordHidden ? true : false) : false
        }
        placeholder={placeholder}
        placeholderTextColor={Colors.White}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        style={{
          width: "90%",
          height: 50,
          borderWidth: 1,
          borderColor: "#0891b2",
          borderRadius: 8,
          padding: 8,
          paddingStart: 20,
          fontSize: 17,
          color: "#fff",
          textShadowColor: "#22d3ee",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 12,
          opacity: 0.7,
          textAlign: "left",
          fontFamily: "Orbitron",
        }}
      />
      {hasSecureTextEntry ? (
        <View>
          <Ionicons
            name={isPasswordHidden ? "eye" : "eye-off"}
            size={32}
            color="#fff"
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        </View>
      ) : null}
    </View>
  );
};

export const ButtonSubmit = ({ title, onPress }: ButtonSubmitProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: "90%",
        marginVertical: 20,
      }}
    >
      <LinearGradient
        colors={["#22d3ee", "#0891b2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <CustomText text={title} fontSize={20} color={Colors.White} />
      </LinearGradient>
    </Pressable>
  );
};
