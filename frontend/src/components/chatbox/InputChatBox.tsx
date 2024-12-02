"use client";
import { useInfo } from "@/contexts/context";

export default function InputChatBox() {
  const { question, setQuestion, askAI } = useInfo();

  return (
    <>
      <input
        type="text"
        className="w-4/5 bg-gray-300 rounded-lg text-xl text-black pl-4 focus:outline-none h-14 "
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
      />
      <button
        className={`w-1/5 bg-gray-300 text-xl text-black rounded-lg px-2 h-14 hover:cursor-pointer hover:bg-black hover:text-white ${
          question == "" ? "opacity-50" : "opacity-100"
        }`}
        disabled={question == "" ? true : false}
        onClick={() => askAI(question)}
      >
        <span className="text-sm"> Make a Question</span>
      </button>
    </>
  );
}
