interface ISignProps {
  isOpen: boolean;
  hasSignUp: (newState: boolean) => void;
}

export default function SignIn(props: ISignProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center text-black bg-gray-300 h-auto w-auto pt-4 pb-2 px-4 rounded-xl gap-y-4 transition-all duration-1000 absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        props.isOpen ? "left-1/2" : "-left-1/2 "
      } `}
    >
      <div className="flex-1">
        <input
          type="text"
          placeholder="email"
          className="rounded-lg placeholder:pl-2 placeholder:text-black border-[1px] border-black"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="password"
          className="rounded-lg placeholder:pl-2 placeholder:text-black border-[1px] border-black"
        />
      </div>
      <div className="flex-1">
        <button className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black">
          Log In
        </button>
      </div>
      <div className="flex-1">
        <span className="text-sm">Not Registered Yet? </span>
        <button className="text-sm" onClick={() => props.hasSignUp(false)}>
          Click here.
        </button>
      </div>
    </div>
  );
}
