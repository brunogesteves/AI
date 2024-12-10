import InputChat from "./inputChat";
import Sidebar from "./sideBar/sidebar.view";
import ChatArea from "./chatArea";

export default function ChatBox() {
  return (
    <>
      <div className="w-1/5 rounded-l-lg p-2 bg-red-950 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="pl-5 w-4/5 ">
        <ChatArea />
        <InputChat />
      </div>
    </>
  );
}
