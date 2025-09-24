"use client";

import { MdCancel } from "react-icons/md";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orbitron } from "@/utils/fonts";

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
    <dialog className="min-w-screen max-[440px]:w-full  min-h-screen flex flex-col items-center justify-center bg-black/40">
      <form
        className="flex flex-col p-5 gap-y-5 bg w-1/2 max-[440px]:w-full rounded-2xl border-[1px] border-blue-500"
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
          <p className={`${orbitron.className} messageError neon-text text-sm`}>
            {data.errors.projectname?.message}
          </p>
        </div>
        <div className="w-full flex justify-around">
          <input
            type="submit"
            className={`${orbitron.className} buttonSubmit w-40 text-sm`}
          />
          <ButtonAction
            icon={<MdCancel size={20} />}
            text="Cancel"
            action={() => closeModal(false)}
            disable={false}
          />
        </div>
      </form>
      <ToastContainer />
    </dialog>
  );
}
