import ChatBoxArea from "./ChatBoxArea";
import InputChatBox from "../InputChatBox";

export default function ChatAreaBox() {
  return (
    <div className="h-full flex flex-col justify-end  w-full pb-3 gap-y-4 rounded-lg">
      <ChatBoxArea />
      <div className=" flex items-center gap-x-4 px-4">
        <InputChatBox />
      </div>
    </div>
  );
}
