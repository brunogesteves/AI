"use client";

import { useChatInfo } from "@/contexts/contextChat";
import { SidebarLogic } from "./sidebar.logic";
import { RiDeleteBin3Fill } from "react-icons/ri";

import ModalFile from "../modalFile";

export default function SidebarView() {
  const { setIsModalopen, setfileName, setChoosedFiles, choosedFiles } =
    useChatInfo();
  const { data, methods } = SidebarLogic();

  return (
    <>
      <div {...methods.getRootProps({ className: "dropzone" })}>
        <input {...methods.getInputProps()} />
        <button
          className="bg-yellow-300 w-full text-center text-red-500 rounded-lg"
          type="button"
        >
          Upload File
        </button>
      </div>
      <aside className="my-4">
        <h4 className="text-center">Files</h4>
        {data.files?.map((file, i) => {
          return (
            <div key={i} className="flex justify-center items-center gap-x-3">
              <input
                type="checkbox"
                onClick={(e) => {
                  const isChecked = (e.target as HTMLInputElement).checked;
                  setChoosedFiles(
                    isChecked
                      ? [...choosedFiles, file.name]
                      : choosedFiles.filter((file) => file !== file)
                  );
                }}
              />
              <button
                className="my-5 py-2  bg-green-500 text-sm text-black rounded-lg text-center cursor-pointer w-full"
                onClick={() => {
                  setfileName(file.name);
                  setIsModalopen(true);
                }}
              >
                view {file?.name?.toLocaleUpperCase()}
              </button>
              <RiDeleteBin3Fill
                color="red"
                size={30}
                onClick={() => methods.deleteFile(file.id)}
              />
            </div>
          );
        })}
      </aside>
      <ModalFile />
    </>
  );
}
