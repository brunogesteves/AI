"use client";

import Ai from "./AI";
import User from "./user";

import { useChatInfo } from "@/contexts/contextChat";

export default function ChatArea() {
  const { contentConversation } = useChatInfo();

  return (
    <div className="bg-gray-300 w-full   h-[calc(100vh_-_120px)] p-4 rounded-lg flex flex-col-reverse text-black  overflow-y-auto ">
      {contentConversation?.toReversed().map((content, i: number) => {
        return (
          <div key={i}>
            <User content={content?.user} />
            <Ai content={content?.ai} />
          </div>
        );
      })}
    </div>
  );
}
