"use client";

import { RiDeleteBin3Fill } from "react-icons/ri";

// import { ToastContainer } from "react-toastify";
// import Link from "next/link";

import { IParamsId } from "@/utils/types";
import { ProjectIdLogic } from "./logic";
import User from "@/components/project/user";
import Ai from "@/components/project/AI";

export default function ProjectIdPage({ params }: IParamsId) {
  const { data, methods } = ProjectIdLogic({ params });
  return (
    <>
      <div className="w-1/5 rounded-l-lg p-2 bg-red-950 ">
        <div {...methods.getRootProps({ className: "dropzone" })}>
          <input {...methods.getInputProps()} />
          <button
            className="bg-yellow-300 w-full text-center text-red-500 rounded-lg cursor-pointer"
            type="button"
          >
            Upload File
          </button>
        </div>
        <aside className="mt-4  h-screen overflow-y-auto">
          <h4 className="text-center">Choose a file</h4>
          {data.files?.map((file, i) => {
            return (
              <div
                key={i}
                className="flex justify-center items-center gap-2 bg-yellow-50"
              >
                <input
                  type="checkbox"
                  checked={data.choosedFile == file.name ? true : false}
                  readOnly
                  onClick={(e) => {
                    methods.setChoosedFile(
                      (e.target as HTMLInputElement).checked ? file.name : ""
                    );
                  }}
                />
                <button
                  className="my-5 py-2  bg-green-500 text-sm text-black rounded-lg text-center cursor-pointer w-full"
                  onClick={() => {
                    methods.setFileName(file.name);
                    methods.setIsModalopen(true);
                  }}
                >
                  View {file?.name?.toLocaleUpperCase()}
                </button>
                <RiDeleteBin3Fill
                  color="red"
                  size={20}
                  onClick={() => methods.deleteFile(file.id)}
                />
              </div>
            );
          })}
        </aside>
        <dialog
          open={data.isModalopen}
          className="w-full h-full bg-transparent "
        >
          <div className="bg-black opacity-60 w-full h-full relative"></div>
          <div
            className=" flex flex-col justify-center bg-red-500 w-[calc(100vw_-_14vw)] h-[calc(100vh_-_14vh)] absolute
          top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 p-2
          rounded-md gap-10 text-3xl"
          >
            {data.fileName != "" && methods.openFile(data.fileName)}
          </div>
        </dialog>
      </div>
      <div className="pl-5 w-4/5 ">
        <div className="bg-gray-300 w-full   h-[calc(100vh_-_115px)] p-4 rounded-lg flex flex-col-reverse text-black  overflow-y-auto ">
          {data.contentConversation?.map((content, i: number) => {
            return (
              <div key={i}>
                <User content={content?.user} />
                <Ai content={content?.ai} />
              </div>
            );
          })}
        </div>
        <div className="flex items-center mt-4  gap-x-5">
          <input
            type="text"
            className="w-4/5 bg-gray-300 rounded-lg text-xl text-black pl-4 focus:outline-none h-14 "
            onChange={(e) => methods.setQuestion(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                methods.askAI(data.question);
              }
            }}
            value={data.question}
          />
          <button
            className={`w-1/5 text-xl text-black  rounded-lg px-2 h-14 ${
              data.question == ""
                ? "hover:cursor-auto  bg-yellow-500 text-white"
                : "hover:cursor-pointer bg-gray-300  hover:bg-black hover:text-white"
            }`}
            disabled={data.isButtonDisabled}
            onClick={() => methods.askAI(data.question)}
          >
            <span className="text-sm"> Make a Question</span>
          </button>
        </div>{" "}
      </div>
    </>
  );
}
