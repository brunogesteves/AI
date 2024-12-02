"use client";
import { ChatBoxProvider } from "@/contexts/context";

import ChatArea from "@/components/chatbox/ChatArea";

import { useState } from "react";
import Sign from "@/components/sign/sign";

export default function Home() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <>
      {isLogged ? (
        <ChatBoxProvider>
          <ChatArea />
        </ChatBoxProvider>
      ) : (
        <Sign />
      )}
    </>
  );
}
