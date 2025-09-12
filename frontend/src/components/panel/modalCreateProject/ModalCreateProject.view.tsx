"use client";

import { MdCancel } from "react-icons/md";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ModalCreateProjectLogic } from "./modalCreateProject.logic";
import { ICreateProjectProps } from "@/utils/types";
import { ButtonAction } from "@/utils/buttons";

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
        className="flex flex-col p-5 gap-y-5 bg w-auto rounded-2xl border-[1px] border-blue-500"
        onSubmit={methods.handleSubmit(methods.onSubmit)}
      >
        <MdCancel
          size={20}
          color="white"
          onClick={() => () => closeModal(false)}
        />
        <span className="neon-text text-2xl text-center">
          Create a new project
        </span>
        <div>
          <input
            placeholder="Type the name of the project"
            className="inputField"
            {...methods.register("projectname")}
          />
          <p className="text-red-500 text-md">
            {data.errors.projectname?.message}
          </p>
        </div>
        <div className="w-full flex justify-around">
          <input type="submit" className="buttonSubmit w-auto" />
          <ButtonAction
            icon={<MdCancel size={20} />}
            text="Cancel"
            action={() => closeModal(false)}
          />
        </div>
      </form>
      <ToastContainer />
    </dialog>
  );
}
