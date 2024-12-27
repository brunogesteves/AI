"use client";
import ModalUpdateProfile from "./modalUpdateProfile/modalUpdateProfile.view";
import ModalCreateProject from "./modalCreateProject/ModalCreateProject.view";
import { PanelUserLogic } from "./panelUser.logic";
import ModalDeleteProject from "./modalDeleteProject/modalDeleteProject.view";
import { ButtonAction } from "../../utils/buttons";
export default function PanelUser() {
  const { data, methods } = PanelUserLogic();

  return (
    <div>
      <div>
        Welcome {data?.userSettings?.firstname} {data?.userSettings?.lastname}
      </div>

      <ButtonAction
        text="Create Project"
        action={() => methods.setOpenNewProjectModal(true)}
      />
      <ButtonAction
        text="Create Project"
        action={() => methods.setOpenUpdateProfileModal(true)}
      />

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
                  methods.setProjectDataToDelete({
                    id: project.id,
                    name: project.name,
                  });

                  methods.setOpenDeleteProjectModal(true);
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
      <ModalDeleteProject
        projectDataToDelete={data.projectDataToDelete}
        isOpen={data.openDeleteProjectModal}
        closeModal={(e: boolean) => methods.setOpenDeleteProjectModal(e)}
      />
    </div>
  );
}
