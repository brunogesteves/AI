import { useChatInfo } from "@/contexts/contextChat";
import Image from "next/image";

import { IoCloseCircleSharp } from "react-icons/io5";

export default function ImageFile() {
  const { slug, fileName, setIsModalopen } = useChatInfo();

  return (
    <div className="bg-white w-[calc(100vw_-_15vw)] h-[calc(100vh_-_14vh)] overflow-y-auto flex justify-center items-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_FILE_SOURCE}/${slug}/${fileName}`}
        width={500}
        height={500}
        alt="Picture of the author"
      />

      <button
        className="absolute top-3 right-3"
        onClick={() => setIsModalopen(false)}
      >
        <IoCloseCircleSharp color="red" />
      </button>
    </div>
  );
}
