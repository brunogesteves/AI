import React, { Children, ReactNode, useState } from "react";

import { Button, Pressable, StyleSheet, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, TextNeon } from "./fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { height: 250, width: 400 },
});

interface IBGProps {
  children: React.ReactNode;
}

export const Bg = ({ children }: IBGProps) => {
  return (
    <LinearGradient
      colors={["rgba(12,16,28,0.5)", "rgba(12,16,28,0.8)"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {children}
    </LinearGradient>
  );
};

interface IInputBox {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  hasSecureTextEntry: boolean;
}

export const InputBox = ({
  placeholder,
  onBlur,
  onChangeText,
  value,
  hasSecureTextEntry,
}: IInputBox) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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
          fontSize: 20,
          color: "#fff",
          textShadowColor: "#22d3ee",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 12,
          opacity: 0.7,
          textAlign: "left",
        }}
      />
      {hasSecureTextEntry ? (
        <View>
          <Ionicons
            name={isPasswordHidden ? "eye" : "eye-off"}
            size={32}
            color="#fff"
            // style={{ position: "absolute", right: 4, top: 9 }}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        </View>
      ) : null}
    </View>
  );
};

interface ButtonSubmitProps {
  title: string;
  onPress: () => void;
}

export const ButtonSubmit = ({ title, onPress }: ButtonSubmitProps) => {
  return (
    // <Pressable
    //   onPress={onPress}
    //   style={{
    //     width: "90%",
    //     alignItems: "center",
    //     padding: 8,
    //     borderColor: "rgb(59,130,246)",
    //     backgroundColor: "rgb(11,15,26)",
    //   }}
    // >
    //   <TextNeon text={title} fontSize={20} />
    // </Pressable>
    <Pressable
      onPress={() => alert("Clicou!")}
      style={{
        width: "90%",
        // alignItems: "center",
        // // borderColor: "rgb(59,130,246)",
        // borderWidth: 0,
        // // backgroundColor: "rgb(11,15,26)",
      }}
    >
      <LinearGradient
        colors={["#22d3ee", "#0891b2"]} // gradiente cyan-400 → cyan-600
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          alignItems: "center",
          // borderWidth: 0,
        }}
      >
        <TextNeon text={title} fontSize={25} color={Colors.White} />
      </LinearGradient>
    </Pressable>
  );
};
// w-full h-full flex items-center gap-x-2 px-10 py-4 bg-[#0B0F1A]
//     border-1    border-blue-500 text-white rounded-lg
//     hover:bg-linear-to-r     hover:from-cyan-700      hover:via-cyan-400      hover:to-cyan-700
//     uppercase text-2xl;

// @import "tailwindcss";

// @layer components {
//   .neon-text {
//     @apply text-cyan-400
//         text-5xl
//         font-bold

//         tracking-widest
//         drop-shadow-[0_0_8px_#22d3ee];
//   }
//   .inputField {
//     @apply w-96 rounded-lg p-2 text-white border-[1px] border-cyan-600;
//   }
//   .buttonSubmit {
//     @apply cursor-pointer
//   }
//   .bg {
//     @apply bg-gradient-to-r  from-[#0C101C] from-30%  to-black to-75%;
//   }
//   .borderChat {
//     @apply border-[1px] border-blue-500;
//   }
//   .messageError {
//     @apply mt-1       text-lg        h-7;
//   }
// }
