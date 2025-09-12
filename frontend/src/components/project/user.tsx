import { RiUserFill } from "react-icons/ri";

import { orbitron } from "@/utils/fonts";

interface IContentUser {
  content: string;
}

export default function User({ content }: IContentUser) {
  return (
    <div className="flex justify-between items-start gap-x-5 p-2">
      <RiUserFill size={25} color="white" />
      <p
        className={`${orbitron.className} 
            neon-text text-sm flex justify-start items-start text-justify text-white w-full border-[1px] border-blue-500 rounded-xl p-6 `}
      >
        {content}
      </p>
    </div>
  );
}
