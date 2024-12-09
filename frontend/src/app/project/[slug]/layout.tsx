// import ChatBoxArea from "./ChatBoxArea";
// import InputChatBox from "./InputChatBox";
import { ChatAreaProvider } from "@/contexts/contextChat";
import React from "react";

export default async function PanelLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const slug = (await params).slug;

  return (
    <ChatAreaProvider params={slug}>
      <div className="bg-red-500 h-screen p-5 ">
        <div className="bg-yellow-700 h-full flex justify-start rounded-lg">
          {children}
        </div>
      </div>
    </ChatAreaProvider>
  );
}

{
}
