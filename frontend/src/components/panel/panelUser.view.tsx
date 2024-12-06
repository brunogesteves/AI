"use client";
import ModalUpdateProfile from "./ModalCreateProject/modalUpdateProfile.view";
import ModalCreateProject from "./ModalUpdateProfile/ModalCreateProject.view";
import { PanelUserLogic } from "./panelUser.logic";

export default function PanelUser() {
  const { data, methods } = PanelUserLogic();
  return (
    <div>
      <div>
        Welcome {data?.userSettings?.firstname} {data?.userSettings?.lastname}
      </div>
      <button
        onClick={() => methods.setOpenNewProjectModal(true)}
        className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black my-5 mr-5"
      >
        Create Project
      </button>
      <button
        onClick={() => methods.setOpenUpdateProfileModal(true)}
        className="bg-gray-400 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black my-5"
      >
        Update Profile
      </button>
      <div>Projects</div>
      <div className="h-[calc(100vh_-_158px)]  overflow-y-auto">
        {data?.allProJects?.map((project, i: number) => {
          return (
            <div className="flex items-center gap-x-3" key={i}>
              <span className="mr-5 w-14">{project.name}</span>
              <button
                onClick={() => methods.openProject(project.id)}
                className="bg-red-500 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black my-5"
              >
                Open
              </button>
              <button
                onClick={() => {
                  methods.setProjectData({
                    id: project.id,
                    name: project.name,
                  });
                  data.deleteModalRef.current?.showModal();
                }}
                className="bg-red-500 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black my-5"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <ModalUpdateProfile
        isOpen={data.openUpdateProfileModal}
        closeModal={(e: boolean) => methods.setOpenUpdateProfileModal(e)}
      />
      <ModalCreateProject
        isOpen={data.openNewProjectModal}
        closeModal={(e: boolean) => methods.setOpenNewProjectModal(e)}
      />
      <dialog
        ref={data.deleteModalRef}
        className="rounded-md p-7 bg-red-500 focus:outline-none"
      >
        <div className="text-white text-center">
          <p>If you desire to delete this project you must type :</p>
          <p>I want to delete {data.projectData.name}</p>
        </div>
        <input
          type="text"
          className="rounded-md focus:outline-none pl-2"
          value={data.confirmationDeleteProject}
          onChange={(e) => methods.setConfirmationDeleteProject(e.target.value)}
        />
        <button
          onClick={() => {
            methods.deleteProject();
          }}
          className="w-auto rounded-lg py-1 px-5  hover:text-white hover:bg-red-950 text-sm border-[1px] border-black ml-5 bg-white text-red-500"
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
      </dialog>
    </div>
  );
}
