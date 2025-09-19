import React from "react";
import { IDeleteProjectProps } from "@/utils/types";
import { ModalDeleteProjectLogic } from "./modalDeleteProject.logic";
import { MdCancel, MdDeleteSweep } from "react-icons/md";
import { ButtonAction } from "@/utils/buttons";
import { orbitron } from "@/utils/fonts";

export default function ModalDeleteProject({
  projectSettings,
  closeModal,
  isDeleteConfirmed,
}: IDeleteProjectProps) {
  const { data, methods } = ModalDeleteProjectLogic({
    projectSettings,
    closeModal,
    isDeleteConfirmed,
  });

  return (
    <dialog className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-black/40 ">
      <main className="bg border-[1px] rounded-2xl p-5 border-blue-500 w-1/2">
        <MdCancel
          size={20}
          color="white"
          onClick={() => () => closeModal(false)}
        />
        <p className="flex justify-center neon-text text-xl text-white mt-4 w-full">
          If you whish to delete this project you must type :
        </p>
        <p className="flex justify-center neon-text text-xl mt-2 nex text-white">{`"I want to delete ${data.projectSettings?.name}"`}</p>
        <input
          type="text"
          placeholder=""
          className="inputField my-4 w-full "
          value={data.confirmationDeleteProject}
          onChange={(e) => methods.setConfirmationDeleteProject(e.target.value)}
        />
        <div className="flex gap-x-0 flex-row justify-around ">
          <ButtonAction
            icon={<MdDeleteSweep size={20} />}
            text="Delete"
            action={() => methods.deleteProject()}
            disable={!data.isDeleteBeenConfirmed ? true : false}
          />
          <ButtonAction
            icon={<MdCancel size={20} />}
            text="Cancel"
            action={() => closeModal(false)}
            disable={false}
          />
        </div>
      </main>
    </dialog>
  );
}
