import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

export enum Colors {
  Neon = "#22d3ee",
  White = "#fff",
}

interface ITextProps {
  text: string;
  fontSize: number;
  color: Colors;
}

export const CustomText = ({ text, fontSize, color }: ITextProps) => {
  const [loaded, error] = useFonts({
    Orbitron: require("./../../assets/fonts/Orbitron-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Text
      style={{
        fontSize,
        letterSpacing: 0.1,
        color,
        textShadowColor: color,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
        opacity: 0.7,
        marginTop: 0,
        fontFamily: "Orbitron",
      }}
    >
      {text}
    </Text>
  );
};
