import { Slot, Stack } from "expo-router";
import { UserSettingsProvider } from "@/contexts/contextUser";

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
    </UserSettingsProvider>
  );
};

export default Layout;
