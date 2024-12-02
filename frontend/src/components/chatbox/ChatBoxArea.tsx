"use client";
import { useInfo } from "@/contexts/context";
import { useEffect, useState } from "react";
import Ai from "./AI";
import User from "./User";

export default function ChatBoxArea() {
  const { messageAi, contentConversation } = useInfo();
  const [typeText, setTypeText] = useState<string[]>([""]);
  const [i, setI] = useState<number>(0);

  function toType() {
    setTypeText((typeText) => [...typeText, messageAi.charAt(i)]);
  }

  useEffect(() => {
    const speed = 20;
    if (i < messageAi.length) {
      setI((i) => i + 1);
      setTimeout(toType, speed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageAi, typeText]);

  return (
    <div className="bg-gray-300 w-full h-full p-4 rounded-r-lg flex flex-col-reverse text-black  overflow-auto ">
      {contentConversation.reverse().map((content, i) => {
        return (
          <div key={i}>
            <User content={content.user} />
            <Ai content={content.ai} />
          </div>
        );
      })}
    </div>
  );
}
