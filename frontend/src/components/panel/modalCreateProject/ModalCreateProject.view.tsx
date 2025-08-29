"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ModalCreateProjectLogic } from "./modalCreateProject.logic";
import { ICreateProjectProps } from "@/utils/types";

export default function ModalCreateProject({
  projectHasBeenCreated,
  closeModal,
  userId,
}: ICreateProjectProps) {
  const { data, methods } = ModalCreateProjectLogic({
    closeModal,
    projectHasBeenCreated,
    userId,
  });

  return (
    <dialog className="min-w-screen min-h-screen flex items-center justify-center bg-black/40 ">
      <form
        className="flex flex-col p-5 gap-y-5 bg-yellow-500 rounded-2xl w-96"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        <div>
          <input
            placeholder="Type the name of the project"
            className="w-full rounded-lg pl-2 placeholder:text-black/40 border-[1px] border-black"
            {...methods.register("projectname")}
          />
          <p className="text-red-500 text-md">
            {data.errors.projectname?.message}
          </p>
        </div>
        <div className="w-full flex justify-around">
          <input type="submit" className=" cursor-pointer" />
          <button
            type="button"
            className=" cursor-pointer"
            onClick={() => closeModal(false)}
          >
            Close
          </button>
        </div>
      </form>
      <ToastContainer />
    </dialog>
  );
}
