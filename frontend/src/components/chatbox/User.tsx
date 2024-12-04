import { RiUserFill } from "react-icons/ri";
interface IContentUser {
  content: string;
}

export default function User({ content }: IContentUser) {
  return (
    <div className="flex justify-start items-center gap-x-2 mb-1 w-full">
      {/* <Image src="/vercel.svg" alt="AI" width={30} height={30} /> */}
      <RiUserFill size={25} />

      {content}
    </div>
  );
}
