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

  function askAI(question: string) {
    console.log("chamou ai");
    setIsButtonDisabled(true);

    setContentConversation((contentConversation) => [
      ...contentConversation,
      { ai: "", user: question },
    ]);

    api.post(`/askai`, { question }).then((res) => {
      if (res.data.status) {
        setMessageAi(res.data.answer);
        setIsButtonDisabled(false);
        setQuestion("");
      }
    });
  }
  // console.log(contentConversation);

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
    const speed = 50;
    if (i < messageAi.length) {
      setI((i) => i + 1);
      setTimeout(toType, speed);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageAi, typeText]);

  useEffect(() => {
    api.get(`/projects/unique/${slug}`).then((res) => {
      console.log(res.data.data);
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
