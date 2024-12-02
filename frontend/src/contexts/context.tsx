"use client";
import { api } from "@/utils/api";
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
});

export const ChatBoxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    if (hasNewQuestion) {
      const recentConversation = contentConversation;
      recentConversation.push({ ai: "", user: question });
      setContentConversation(recentConversation);
    }
    setHasNewQuestion(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNewQuestion]);
  console.log(contentConversation);

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

  const value = {
    messageAi,
    setMessageAi,
    contentConversation,
    setContentConversation,
    question,
    setQuestion,
    askAI,
  };
  return (
    <DefaultChatBox.Provider value={value}>{children}</DefaultChatBox.Provider>
  );
};

export function useInfo() {
  const useInfo = useContext(DefaultChatBox);
  return useInfo;
}
