import Image from "next/image";
import { loadingIcon } from "@/utils/icons";

export default function Ai(content: string) {
  return (
    <div className=" flex justify-end items-center  gap-x-2 mb-1 w-full">
      <Image src="/globe.svg" alt="user" width={30} height={30} />
      {content == "" ? loadingIcon() : content}
    </div>
  );
}
