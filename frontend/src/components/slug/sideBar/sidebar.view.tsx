"use client";

import { useChatInfo } from "@/contexts/contextChat";
import { SidebarLogic } from "./sidebar.logic";
import ModalFile from "../modalFile";

export default function SidebarView() {
  const { setIsModalopen, setfileName } = useChatInfo();
  const { data, methods } = SidebarLogic();

  return (
    <>
      <div {...methods.getRootProps({ className: "dropzone" })}>
        <input {...methods.getInputProps()} />
        <button type="button">Open File Dialog</button>
      </div>
      <aside>
        <h4>Files</h4>
        {data.files?.map((file, i) => {
          return (
            <div key={i}>
              <button
                className="my-5 py-2  bg-green-500 text-black rounded-lg text-center cursor-pointer w-full"
                onClick={() => {
                  setfileName(file.name);
                  setIsModalopen(true);
                }}
              >
                {file?.name?.toLocaleUpperCase()}
              </button>
            </div>
          );
        })}
      </aside>
      <ModalFile />
    </>
  );
}
