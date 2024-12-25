"use client";
import { useChatInfo } from "@/contexts/contextChat";

export default function InputChat() {
  const { setQuestion, askAI, question, isButtonDisabled } = useChatInfo();
  return (
    <div className="flex items-center mt-4  gap-x-5">
      <input
        type="text"
        className="w-4/5 bg-gray-300 rounded-lg text-xl text-black pl-4 focus:outline-none h-14 "
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") askAI(question);
        }}
        value={question}
      />
      <button
        className={`w-1/5 text-xl text-black  rounded-lg px-2 h-14 ${
          question == ""
            ? "hover:cursor-auto  bg-yellow-500 text-white"
            : "hover:cursor-pointer bg-gray-300  hover:bg-black hover:text-white"
        }`}
        disabled={isButtonDisabled}
        onClick={() => askAI(question)}
      >
        <span className="text-sm"> Make a Question</span>
      </button>
    </div>
  );
}
