import { AuthProvider } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Slot, Redirect } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  return (
    <AuthProvider>
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
        }}
      >
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
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
