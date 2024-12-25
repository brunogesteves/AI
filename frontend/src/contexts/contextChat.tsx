"use client";

import { api } from "@/utils/api";
import { IChatSettingProps, IConversationProps } from "@/utils/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const DefaultChatArea = createContext<IChatSettingProps>({
  typeText: [],
  setTypeText: () => {},
  messageAi: "",
  setMessageAi: () => {},
  question: "",
  setQuestion: () => {},
  isButtonDisabled: false,
  setIsButtonDisabled: () => {},
  contentConversation: [
    {
      user: "",
      ai: "",
    },
  ],
  setContentConversation: () => {},
  slug: "",
  setSlug: () => {},
  askAI: () => {},
  modalRef: null,
  isModalopen: false,
  setIsModalopen: () => {},
  fileName: "",
  setfileName: () => {},
  choosedFile: "",
  setChoosedFile: () => {},
});

export const ChatAreaProvider = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: string;
}) => {
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const [isModalopen, setIsModalopen] = useState<boolean>(false);
  const [fileName, setfileName] = useState<string>("");
  const [typeText, setTypeText] = useState<string[]>([]);
  const [i, setI] = useState<number>(0);
  const [messageAi, setMessageAi] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [choosedFile, setChoosedFile] = useState<string>("");
  const [contentConversation, setContentConversation] = useState<
    IConversationProps[]
  >([
    {
      user: "",
      ai: "",
    },
  ]);
  const [slug, setSlug] = useState("");

  function askAI(question: string) {
    setTypeText([]);
    setIsButtonDisabled(true);

    setContentConversation((contentConversation) => [
      ...contentConversation,
      { ai: "", user: question },
    ]);

    api.post(`/askai`, { question, slug, choosedFile }).then((res) => {
      if (res.data.status) {
        setMessageAi(res.data.answer);
        setIsButtonDisabled(false);
        setQuestion("");
      }
    });
  }

  function toType() {
    if (i == 0) {
      typeText[0] = messageAi.charAt(i);
      setTypeText((typeText) => [(typeText[0] = messageAi.charAt(i))]);
    }
    setTypeText((typeText) => [...typeText, messageAi?.charAt(i + 1)]);

    contentConversation[contentConversation.length - 1].ai = typeText
      .toString()
      .replaceAll(",", "");
  }

  useEffect(() => {
    const speed = 30;
    if (i < messageAi.length) {
      setI((i) => i + 1);
      setTimeout(toType, speed);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageAi, typeText]);

  useEffect(() => {
    if (slug) {
      api.get(`/askai/historyChat/${slug}`).then((res) => {
        setContentConversation(res.data.chatHistory);
      });
    }
  }, [slug]);

  useEffect(() => {
    setIsButtonDisabled(question == "" ? true : false);
  }, [question]);

  useEffect(() => {
    if (isModalopen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isModalopen]);

  useEffect(() => {
    setSlug(params);
  }, []);

  const value = {
    typeText,
    setTypeText,
    messageAi,
    setMessageAi,
    question,
    setQuestion,
    isButtonDisabled,
    setIsButtonDisabled,
    contentConversation,
    setContentConversation,
    askAI,
    slug,
    setSlug,
    modalRef,
    isModalopen,
    setIsModalopen,
    fileName,
    setfileName,
    choosedFile,
    setChoosedFile,
  };
  return (
    <DefaultChatArea.Provider value={value}>
      {children}
    </DefaultChatArea.Provider>
  );
};

export function useChatInfo() {
  const useInfo = useContext(DefaultChatArea);
  return useInfo;
}
