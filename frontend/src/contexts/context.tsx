"use client";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

// import { jwtDecode } from "jwt-decode";

import { IChatBoxArea, IConversation } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";

const DefaultChatBox = createContext<IChatBoxArea>({
  messageAi: "",
  setMessageAi: () => {},
  contentConversation: [],
  setContentConversation: () => {},
  question: "",
  setQuestion: () => {},
  askAI: () => {},
  isLogged: false,
  setIsLogged: () => {},
});

export const ChatBoxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [messageAi, setMessageAi] = useState<string>("");
  const [contentConversation, setContentConversation] = useState<
    IConversation[]
  >([
    {
      user: "pergunta1",
      ai: "resposta1",
    },
    {
      user: "pergunta2",
      ai: "resposta2",
    },
    {
      user: "pergunta3",
      ai: "resposta3",
    },
    {
      user: "pergunta4",
      ai: "resposta4",
    },
  ]);

  const [hasNewQuestion, setHasNewQuestion] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/panel");
    } else {
      setIsLogged(false);
    }
  }, []);
  // console.log(jwtDecode(localStorage.getItem("token") ?? ""));

  function askAI() {
    setHasNewQuestion(true);

    api.post("/askai", { question }).then((res) => {
      const recentConversation = contentConversation;
      recentConversation[recentConversation.length - 1].user = question;

      if (res.data) {
        console.log(res.data.answer);
        recentConversation[recentConversation.length - 1].ai = res.data.answer;
      }
      setContentConversation(recentConversation);
      setQuestion("");
    });
  }

  useEffect(() => {
    if (hasNewQuestion) {
      const recentConversation = contentConversation;
      recentConversation.push({ ai: "", user: question });
      setContentConversation(recentConversation);
    }
    setHasNewQuestion(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNewQuestion]);

  const value = {
    messageAi,
    setMessageAi,
    contentConversation,
    setContentConversation,
    question,
    setQuestion,
    askAI,
    isLogged,
    setIsLogged,
  };
  return (
    <DefaultChatBox.Provider value={value}>{children}</DefaultChatBox.Provider>
  );
};

export function useInfo() {
  const useInfo = useContext(DefaultChatBox);
  return useInfo;
}
