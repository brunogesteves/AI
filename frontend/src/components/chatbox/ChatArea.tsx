import Sidebar from "../sidebar";
import ChatBoxArea from "./ChatBoxArea";
import InputChatBox from "./InputChatBox";

export default function ChatArea() {
  return (
    <div className="bg-yellow-500 h-screen p-5 ">
      <div className="bg-yellow-700 h-full  flex justify-start rounded-lg">
        <div className="w-1/5 h-auto rounded-l-lg p-2 bg-red-950">
          <Sidebar />
        </div>
        <div className="w-4/5 pl-2 h-auto ">
          <div className="w-full h-full flex flex-col justify-end pb-3 gap-y-4 rounded-lg">
            <ChatBoxArea />
            <div className="flex items-center gap-x-4 pr-2">
              <InputChatBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
