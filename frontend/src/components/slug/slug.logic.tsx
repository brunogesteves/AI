"use client";
import { api } from "@/utils/api";
import { IConversation } from "@/utils/types";
import { useEffect, useState } from "react";

export const SlugLogic = (slug: string) => {
  const [typeText, setTypeText] = useState<string[]>([]);
  const [i, setI] = useState<number>(0);
  const [messageAi, setMessageAi] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [contentConversation, setContentConversation] = useState<
    IConversation[]
  >([
    {
      user: "",
      ai: "",
    },
  ]);

  function askAI(question: string) {
    console.log("chamou ai");
    setTypeText([]);
    setIsButtonDisabled(true);

    setContentConversation((contentConversation) => [
      ...contentConversation,
      { ai: "", user: question },
    ]);

    api.post(`/askai`, { question, slug }).then((res) => {
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
    api.get(`/askai/historyChat/${slug}`).then((res) => {
      setContentConversation(res.data.chatHistory);
      console.log(res.data.chatHistory);
    });
  }, [slug]);

  useEffect(() => {
    setIsButtonDisabled(question == "" ? true : false);
  }, [question]);

  return {
    data: { contentConversation, question, isButtonDisabled },
    methods: { askAI, setQuestion },
  };
};
