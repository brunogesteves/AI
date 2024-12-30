import { Slot, Stack } from "expo-router";
import { UserSettingsProvider } from "@/contexts/contextUser";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
  return (
    <UserSettingsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </UserSettingsProvider>
  );
};

export default Layout;
