interface ButtonProps {
  action: () => void;
  text: string;
  icon: React.ReactNode;
}

// import { orbitron } from "@/utils/fonts";
import { Pressable, Text, View } from "react-native";
import * as React from "react";
import { Colors, CustomText } from "./fonts";

export const ButtonAction = ({ action, text, icon }: ButtonProps) => {
  return (
    <Pressable
      onPress={action}
      style={{
        backgroundColor: "transparent",
        borderColor: "#00FFFF", // Neon azul
        borderWidth: 2,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#00FFFF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {icon}

        <CustomText color={Colors.White} fontSize={23} text={text} />
      </View>
    </Pressable>
  );
};
