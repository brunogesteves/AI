"use client";
import { IConversation } from "@/utils/types";
import Ai from "./AI";
import User from "./User";
import { SlugLogic } from "./slug.logic";

interface ISlugProps {
  slug: string;
}
export default function Slug({ slug }: ISlugProps) {
  const { data, methods } = SlugLogic(slug);

  return (
    <div className="flex flex-col justify-between  min-h-[calc(100vh_-_5vh)] ">
      <div className="bg-gray-300 w-full   h-[calc(100vh_-_13vh)] p-4 rounded-lg flex flex-col-reverse text-black  overflow-y-auto ">
        {data?.contentConversation
          .toReversed()
          .map((content: IConversation, i: number) => {
            return (
              <div key={i}>
                <User content={content?.user} />
                <Ai content={content?.ai} />
              </div>
            );
          })}
      </div>{" "}
      <div className="flex items-center  gap-x-5">
        <input
          type="text"
          className="w-4/5 bg-gray-300 rounded-lg text-xl text-black pl-4 focus:outline-none h-14 "
          onChange={(e) => methods.setQuestion(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") methods.askAI(data.question);
          }}
          value={data.question}
        />
        <button
          className={`w-1/5 text-xl text-black  rounded-lg px-2 h-14 ${
            data.question == ""
              ? "hover:cursor-auto  bg-yellow-500 text-white"
              : "hover:cursor-pointer bg-gray-300  hover:bg-black hover:text-white"
          }`}
          disabled={data.isButtonDisabled}
          onClick={() => methods.askAI(data.question)}
        >
          <span className="text-sm"> Make a Question</span>
        </button>
      </div>
    </div>
  );
}
