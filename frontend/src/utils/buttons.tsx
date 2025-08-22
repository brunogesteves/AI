interface ButtonProps {
  action: () => void;
  text: string;
}

export const ButtonAction = ({ action, text }: ButtonProps) => {
  return (
    <button
      onClick={action}
      className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black my-5 mr-5"
    >
      {text}
    </button>
  );
};
