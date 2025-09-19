interface ButtonProps {
  action: () => void;
  text: string;
  icon: React.ReactNode;
  disable: boolean;
}

import { orbitron } from "@/utils/fonts";

export const ButtonAction = ({ action, text, icon, disable }: ButtonProps) => {
  return (
    <div className="p-[1px] rounded-lg bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600">
      <button
        onClick={action}
        className={`${orbitron.className} cursor-pointer  w-full h-full flex items-center gap-x-2 px-10 py-4 bg-[#0B0F1A] text-white rounded-lg`}
        disabled={disable}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};
