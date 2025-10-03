interface ButtonProps {
  action: () => void;
  text: string;
  icon: React.ReactNode;
  fontSize: number;
}

// import { orbitron } from "@/utils/fonts";
import { Pressable, Text, View } from "react-native";
import * as React from "react";
import { Colors, CustomText } from "./fonts";

export const ButtonAction = ({ action, text, icon, fontSize }: ButtonProps) => {
  return (
    <Pressable
      onPress={action}
      style={{
        borderWidth: 1,
        borderColor: "#0891b2",
        borderRadius: 8,
        padding: 8,
        paddingStart: 20,
        opacity: 0.7,
        backgroundColor: "transparent",
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#00FFFF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        marginEnd: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {icon}

        <CustomText color={Colors.White} fontSize={fontSize} text={text} />
      </View>
    </Pressable>
  );
};
