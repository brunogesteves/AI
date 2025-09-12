import React from "react";
import { IDeleteProjectProps } from "@/utils/types";
import { ModalDeleteProjectLogic } from "./modalDeleteProject.logic";
import { MdCancel } from "react-icons/md";
import { ButtonAction } from "@/utils/buttons";

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
      <main className="bg border-[1px] rounded-2xl p-5 border-blue-500">
        <MdCancel
          size={20}
          color="white"
          onClick={() => () => closeModal(false)}
        />
        <p className="text-white mt-4">
          If you whish to delete this project you must type :
        </p>
        <p className="text-white">{`"I want to delete ${data.projectSettings?.name}"`}</p>
        <input
          type="text"
          placeholder=""
          className="inputField my-4"
          value={data.confirmationDeleteProject}
          onChange={(e) => methods.setConfirmationDeleteProject(e.target.value)}
        />
        <div className="flex gap-x-5 flex-row justify-around w-96">
          <button
            onClick={() => {
              methods.deleteProject();
            }}
            className={`buttonSubmit ${
              data.isDeleteBeenConfirmed
                ? "bg-red-500 text-black cursor-pointer"
                : "bg-black text-white cursor-pointer"
            }`}
            disabled={!data.isDeleteBeenConfirmed ? true : false}
          >
            Delete
          </button>
          <ButtonAction
            icon={<MdCancel size={20} />}
            text="Cancel"
            action={() => closeModal(false)}
          />
        </div>
      </main>
    </dialog>
  );
}
