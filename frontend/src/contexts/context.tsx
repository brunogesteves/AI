"use client";
// import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import { IChatBoxArea, IUserProps } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";

const DefaultChatBox = createContext<IChatBoxArea>({
  // messageAi: "",
  // setMessageAi: () => {},
  // contentConversation: [],
  // setContentConversation: () => {},
  // question: "",
  // setQuestion: () => {},
  // askAI: () => {},
  userSettings: {
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    password: "",
  },
  setUserSettings: () => {},
});

export const ChatBoxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [userSettings, setUserSettings] = useState<IUserProps>({
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserSettings(jwtDecode(localStorage.getItem("token") ?? ""));
      router.push("/panel");
    } else {
      router.push("/");
    }
  }, []);

  const value = {
    // messageAi,
    // setMessageAi,
    // contentConversation,
    // setContentConversation,
    // question,
    // setQuestion,
    // askAI,
    userSettings,
    setUserSettings,
  };
  return (
    <DefaultChatBox.Provider value={value}>{children}</DefaultChatBox.Provider>
  );
};

export function useInfo() {
  const useInfo = useContext(DefaultChatBox);
  return useInfo;
}
