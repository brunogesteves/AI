import React from "react";
import { IModalProps } from "@/utils/types";
import { ModalDeleteProjectLogic } from "./modalDeleteProject.logic";

export default function ModalDeleteProject({
  projectDataToDelete,
  isOpen,
  closeModal,
}: IModalProps) {
  const { data, methods } = ModalDeleteProjectLogic({
    isOpen,
    closeModal,
    projectDataToDelete,
  });

  return (
    <dialog
      ref={data.deleteModalRef}
      className="rounded-md p-7 bg-red-500 focus:outline-none"
    >
      <div className="text-white text-center">
        <p>If you whish to delete this project you must type :</p>
        <p>{`"I want to delete ${data.projectDataToDelete?.name}"`}</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-3 mt-2">
        <div className="w-full">
          <input
            type="text"
            className="rounded-md focus:outline-none pl-2 w-full"
            value={data.confirmationDeleteProject}
            onChange={(e) =>
              methods.setConfirmationDeleteProject(e.target.value)
            }
          />
        </div>
        <div className="flex flex-row justify-around w-full">
          <button
            onClick={() => {
              methods.deleteProject();
            }}
            className={`w-auto rounded-lg py-1 px-5   text-sm border-[1px] border-black ml-5 ${
              data.isDeleteConfirmed
                ? "bg-white text-red-500"
                : "bg-black text-white cursor-none"
            }`}
            disabled={data.isDeleteConfirmed ?? false}
          >
            Delete
          </button>
          <button
            onClick={() => {
              data.deleteModalRef.current?.close();
            }}
            className="w-auto rounded-lg py-1 px-5  hover:text-white hover:bg-red-950 text-sm border-[1px] border-black ml-5 bg-white text-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
