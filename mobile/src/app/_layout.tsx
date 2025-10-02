import { AuthProvider } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Slot, Redirect } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  return (
    <AuthProvider>
      <LinearGradient
        colors={["#0a0f1c", "#0f172a", "#09111f"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,

              width: Dimensions.get("window").width,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Slot />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider>
      </LinearGradient>
    </AuthProvider>
  );
}
