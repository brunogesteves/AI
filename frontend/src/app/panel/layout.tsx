// import ChatBoxArea from "./ChatBoxArea";
// import InputChatBox from "./InputChatBox";
import Sidebar from "@/components/panel/sidebar";
import { UserSettingsProvider } from "@/contexts/context";
import React from "react";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserSettingsProvider>
      <div className="bg-red-500 h-screen p-5 ">
        <div className="bg-yellow-700 h-full  flex justify-start rounded-lg">
          <div className="w-1/5 h-auto rounded-l-lg p-2 bg-red-950">
            <Sidebar />
          </div>
          <div className="pl-5 w-4/5 ">{children}</div>
        </div>
      </div>
    </UserSettingsProvider>
  );
}

{
}
