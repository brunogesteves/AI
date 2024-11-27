// import Image from "next/image";
import Sidebar from "@/components/sidebar";
import ChatBox from "@/components/chatbox/Chatbox";
import { ChatBoxProvider } from "@/contexts/context";

export default function Home() {
  return (
    <ChatBoxProvider>
      <div className="bg-yellow-500 h-screen p-5">
        <div className="bg-yellow-700 h-full  flex justify-start">
          <div className="w-1/5 h-auto rounded-l-lg p-2 bg-red-950">
            <Sidebar />
          </div>
          <div className="w-4/5 pl-2 h-auto ">
            <ChatBox />
          </div>
        </div>
      </div>
    </ChatBoxProvider>
  );
}
