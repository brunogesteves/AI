"use client";

import { RiDeleteBin3Fill } from "react-icons/ri";
import { IoCloseSharp, IoReturnDownBackSharp } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";

import { IConversationProps, IParamsId } from "@/utils/types";
import { ProjectIdLogic } from "./logic";
import User from "@/components/project/user";
import Ai from "@/components/project/AI";
import { ButtonAction } from "@/utils/buttons";

export default function ProjectIdPage({ params }: IParamsId) {
  const { data, methods } = ProjectIdLogic({ params });

  return (
    <>
      <aside className="h-[calc(100vh_-_40px)] w-1/5 rounded-l-lg p-2">
        <ButtonAction
          action={() => {
            data.router.back();
          }}
          icon={<IoReturnDownBackSharp />}
          text="return"
        />

        <div {...methods.getRootProps({ className: "dropzone mt-5" })}>
          <input {...methods.getInputProps()} />
          <ButtonAction
            action={() => {}}
            icon={<FaFileUpload />}
            text="Upload File"
          />
        </div>

        <div className="h-[calc(100vh_-_220px)]">
          <h4 className="text-center">Choose a file</h4>
          <div className="h-[calc(100vh_-_220px)] overflow-y-auto">
            {data.files?.map((file, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-center items-center h-30 gap-x-3 my-5 first:mt-0 p-2"
                >
                  <div className="h-full flex flex-col justify-around">
                    <div className="border-[1px] text-center border-blue-500 rounded-lg px-1">
                      <input
                        type="radio"
                        name="item"
                        // checked={data.files[i].name == file.name ? true : false}
                        className="border-[1px] border-blue-500 rounded-lg px-2"
                        onClick={() => {
                          methods.setChoosedFile(file.name);
                        }}
                      />
                    </div>
                    <RiDeleteBin3Fill
                      color="red"
                      size={30}
                      onClick={() => methods.deleteFile(file.id)}
                      className="border-[1px] border-blue-500 rounded-lg px-1"
                    />
                  </div>
                  <button
                    className="my-5 py-2 text-sm border-[1px] border-blue-500 h-full rounded-lg text-center text-white cursor-pointer w-full"
                    onClick={() => {
                      methods.setFileName(file.name);
                      methods.setIsModalopen(true);
                    }}
                  >
                    View {file?.name?.toLocaleUpperCase()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
      <main className="pl-5 w-4/5">
        <div className=" w-full h-[calc(100vh_-_115px)] p-4 rounded-lg flex flex-col-reverse text-black  overflow-y-auto borderChat">
          {data.conversation
            ?.slice()
            .reverse()
            .map((item: IConversationProps, index: number) => {
              if (item.role == "user") {
                return <User content={item?.parts[0].text} key={index} />;
              } else if (item.role == "model") {
                return (
                  <div key={index}>
                    <Ai
                      content={item.parts[0].text}
                      index={index}
                      historicHasBeenReloaded={data.historicHasBeenReloaded}
                      loading={data.loading}
                    />
                  </div>
                );
              }
            })}
        </div>
        <div className="flex items-center mt-4  gap-x-5">
          <input
            type="text"
            className="inputField w-full h-14"
            onChange={(e) => methods.setQuestion(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                methods.askAI(data.question);
              }
            }}
            value={data.question}
          />
          <button
            className={`w-1/5 text-xl border-[1px] border-blue-500  rounded-lg px-2 h-14 text-white ${
              data.question == ""
                ? "hover:cursor-auto  bg-gray-500 "
                : "hover:cursor-pointer bg-black  hover:bg-black hover:text-white"
            }`}
            disabled={data.question == "" ? true : false}
            onClick={() => methods.askAI(data.question)}
          >
            <span className="text-sm"> Make a Question</span>
          </button>
        </div>{" "}
      </main>
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
