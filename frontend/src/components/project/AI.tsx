import Image from "next/image";

import { orbitron } from "@/utils/fonts";

import TypewriterText from "../typewriterText";
interface IContentAI {
  content: string;
  index: number;
  historicHasBeenReloaded: boolean;
  loading: boolean;
}

export default function Ai({
  content,
  index,
  historicHasBeenReloaded,
  loading,
}: IContentAI) {
  return (
    <div className="flex justify-between items-start gap-x-5 p-2 ">
      <Image src="/globe.svg" alt="user" width={25} height={30} />

      <div
        className={`${orbitron.className} 
        neon-text text-sm flex justify-start items-start text-justify  text-white  w-full border-[1px] border-blue-500 rounded-xl p-6`}
      >
        {index === 0 && historicHasBeenReloaded ? (
          <TypewriterText text={content} index={index} loading={loading} />
        ) : (
          <div className="flex">
            <p>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
