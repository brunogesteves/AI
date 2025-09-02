import Image from "next/image";

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
  // console.log(index === 0 && historicHasBeenReloaded);

  return (
    <div className=" flex justify-start items-start text-justify my-5  gap-x-2 mb-1 w-full">
      {index === 0 && historicHasBeenReloaded ? (
        <TypewriterText text={content} index={index} loading={loading} />
      ) : (
        <>
          <Image src="/globe.svg" alt="user" width={30} height={30} />
          {<p>{content}</p>}
        </>
      )}
    </div>
  );
}
