"use client";
import { useInfo } from "@/contexts/context";

export default function InputChatBox() {
  const { question, setQuestion, askAI } = useInfo();

  return (
    <>
      <input
        type="text"
        className="bg-gray-300 w-full rounded-lg text-xl text-black pl-4 focus:outline-none h-14"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
      />
      <button
        className=" bg-gray-300 text-xl text-black rounded-lg px-4 h-14 hover:bg-black hover:text-white"
        onClick={() => askAI(question)}
      >
        Send
      </button>
    </>
  );
}
