import { useChatInfo } from "@/contexts/contextChat";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { IoCloseCircleSharp } from "react-icons/io5";

export default function AudioFile() {
  const { slug, fileName, setIsModalopen } = useChatInfo();
  return (
    <div className="flex justify-center items-center bg-white w-[calc(100vw_-_15vw)] h-[calc(100vh_-_14vh)] overflow-y-auto">
      <AudioPlayer
        src={`${process.env.NEXT_PUBLIC_FILE_SOURCE}/${slug}/${fileName}`}
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
