interface ButtonProps {
  action: () => void;
  text: string;
  icon: React.ReactNode;
}

import { orbitron } from "@/utils/fonts";

export const ButtonAction = ({ action, text, icon }: ButtonProps) => {
  return (
    // <button
    //   onClick={action}
    //   className="w-auto rounded-xl py-4 px-10 flex items-center gap-x-5 text-xl border-[1px] border-cyan-700 text-cyan-400 my-5 mr-5 cursor-pointer"
    // >
    //   {icon}
    //   {text}
    // </button>
    <div className="p-[1px] rounded-lg bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600">
      <button
        onClick={action}
        className={`${orbitron.className} cursor-pointer  w-full h-full flex items-center gap-x-2 px-10 py-4 bg-[#0B0F1A] text-white rounded-lg`}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};
