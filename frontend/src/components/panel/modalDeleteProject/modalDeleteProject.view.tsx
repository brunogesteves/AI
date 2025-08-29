import React from "react";
import { IDeleteProjectProps } from "@/utils/types";
import { ModalDeleteProjectLogic } from "./modalDeleteProject.logic";

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
      <p className="text-white">
        If you whish to delete this project you must type :
      </p>
      <p className="text-white">{`"I want to delete ${data.projectSettings?.name}"`}</p>
      <input
        type="text"
        className="rounded-md focus:outline-none mt-2 mb-7 w-96 bg-white text-black pl-2"
        value={data.confirmationDeleteProject}
        onChange={(e) => methods.setConfirmationDeleteProject(e.target.value)}
      />
      <div className="flex flex-row justify-around w-96">
        <button
          onClick={() => {
            methods.deleteProject();
          }}
          className={`w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black ml-5 ${
            data.isDeleteBeenConfirmed
              ? "bg-red-500 text-black cursor-pointer"
              : "bg-black text-white cursor-pointer"
          }`}
          disabled={!data.isDeleteBeenConfirmed ? true : false}
        >
          Delete
        </button>
        <button
          onClick={() => {
            closeModal(false);
          }}
          className="w-auto rounded-lg py-1 px-5  hover:text-white hover:bg-red-950 text-sm border-[1px] border-black ml-5 bg-white text-red-500 cursor-pointer"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
