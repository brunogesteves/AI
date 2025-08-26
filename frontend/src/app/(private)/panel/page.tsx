"use client";

// import { ToastContainer } from "react-toastify";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { ButtonAction } from "@/utils/buttons";
import ModalUpdateProfile from "@/components/panel/modalUpdateProfile/modalUpdateProfile.view";
import ModalCreateProject from "@/components/panel/modalCreateProject/ModalCreateProject.view";
import ModalDeleteProject from "@/components/panel/modalDeleteProject/modalDeleteProject.view";
import { PanelLogic } from "./logic";

export default function SignUp() {
  const { data, methods } = PanelLogic();

  return (
    <>
      <div className="bg-red-500 h-screen p-5 ">
        <div className="bg-yellow-700 h-full  flex justify-start rounded-lg">
          <div className="w-1/5 h-auto rounded-l-lg p-2 bg-red-950">
            <div>Warnnigs:</div>;
          </div>
          <div className="pl-5 w-4/5 ">
            <div>
              Welcome {data?.userSettings?.firstname}{" "}
              {data?.userSettings?.lastname}
              <div>
                <ButtonAction
                  text="Update Profile"
                  action={() => methods.setOpenUpdateProfileModal(true)}
                />
                <ButtonAction
                  text="Create Project"
                  action={() => methods.setOpenNewProjectModal(true)}
                />

                <ButtonAction
                  text="Logout"
                  action={() => methods.setOpenUpdateProfileModal(true)}
                />
              </div>
            </div>
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
          </div>
        </div>
        {/* <ModalUpdateProfile
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
        /> */}
      </div>
    </>
  );
}
