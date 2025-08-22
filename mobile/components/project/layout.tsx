import { Slot, Stack } from "expo-router";
import { ChatAreaProvider } from "@/contexts//contextChat";

const Layout = () => {
  return (
    <ChatAreaProvider>
      <Slot />
    </ChatAreaProvider>
  );
};

export default Layout;
