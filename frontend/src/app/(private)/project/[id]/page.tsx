"use client";

import { RiDeleteBin3Fill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

import { IParamsId } from "@/utils/types";
import { ProjectIdLogic } from "./logic";
import User from "@/components/project/user";
import Ai from "@/components/project/AI";

export default function ProjectIdPage({ params }: IParamsId) {
  const { data, methods } = ProjectIdLogic({ params });
  return (
    <>
      <aside className="h-[calc(100vh_-_40px)] w-1/5 rounded-l-lg p-2 bg-red-950">
        <div {...methods.getRootProps({ className: "dropzone" })}>
          <input {...methods.getInputProps()} />
          <button
            className="bg-yellow-300 w-full text-center text-red-500 rounded-lg cursor-pointer"
            type="button"
          >
            Upload File
          </button>
        </div>
        <div className="mt-4 h-[calc(100vh_-_110px)] overflow-y-auto">
          <h4 className="text-center">Choose a file</h4>
          {data.files?.map((file, i) => {
            return (
              <div key={i} className="flex justify-center items-center gap-2">
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
        </div>
      </aside>
      <div className="pl-5 w-4/5 ">
        <div className="bg-gray-300 w-full h-[calc(100vh_-_115px)] p-4 rounded-lg flex flex-col-reverse text-black  overflow-y-auto ">
          {data.conversation
            ?.slice()
            .reverse()
            .map((item, index: number) => {
              return (
                <div key={index}>
                  <User content={item?.user} />
                  <Ai
                    content={item?.ai}
                    index={index}
                    historicHasBeenReloaded={data.historicHasBeenReloaded}
                    loading={data.loading}
                  />
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
            disabled={data.question == "" ? true : false}
            onClick={() => methods.askAI(data.question)}
          >
            <span className="text-sm"> Make a Question</span>
          </button>
        </div>{" "}
      </div>
      {data.isModalopen && (
        <dialog className="min-w-full min-h-full -mt-5  flex items-start justify-center bg-black/40 ">
          {data.fileName != "" && methods.openFile(data.fileName)}
          <IoCloseSharp
            color="white"
            size={20}
            className="m-3 cursor-pointer"
            onClick={() => methods.setIsModalopen(false)}
          />
        </dialog>
      )}
    </>
  );
}
