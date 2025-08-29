import { RiUserFill } from "react-icons/ri";
interface IContentUser {
  content: string;
}

export default function User({ content }: IContentUser) {
  return (
    <div className="flex justify-start items-items-start gap-x-2 mb-1 w-full">
      <RiUserFill size={25} />

      {content}
    </div>
  );
}
