"use client";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { IModalProps } from "@/utils/types";
import { ModalCreateProjectLogic } from "./modalCreateProject.logic";

export default function ModalCreateProject({
  isOpen,
  closeModal,
}: IModalProps) {
  const { data, methods } = ModalCreateProjectLogic({ isOpen, closeModal });

  return (
    <dialog
      ref={data.modalRefProject}
      className="w-full h-full bg-transparent "
    >
      <div className="bg-black opacity-60 w-full h-full relative"></div>

      <form
        className="flex flex-col gap-y-5"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        <div>
          <input
            placeholder="email"
            className=" w-96 rounded-lg pl-2 placeholder:text-black border-[1px] border-black"
            {...methods.register("projectname")}
          />
          <p className="text-red-500 text-md">
            {data.errors.projectname?.message}
          </p>
        </div>

        <input type="submit" className="w-96 cursor-pointer" />
      </form>
      <ToastContainer />
    </dialog>
  );
}
