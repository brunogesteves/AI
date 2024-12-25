import Image from "next/image";
import { loadingIcon } from "@/utils/icons";
interface IContentAI {
  content: string;
}

export default function Ai({ content }: IContentAI) {
  return (
    <div className=" flex justify-end items-start text-justify my-5  gap-x-2 mb-1 w-full">
      <Image src="/globe.svg" alt="user" width={30} height={30} />
      {content == "" ? loadingIcon() : content}
    </div>
  );
}
