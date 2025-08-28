"use client";

import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { ButtonAction } from "@/utils/buttons";
import ModalCreateProject from "@/components/panel/modalCreateProject/ModalCreateProject.view";
import ModalDeleteProject from "@/components/panel/modalDeleteProject/modalDeleteProject.view";
import { PanelLogic } from "./logic";

export default function SignUp() {
  const { data, methods } = PanelLogic();

  return (
    <>
      <div className="bg-red-500 min-w-screen min-h-screen p-5 ">
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
                  action={() => methods.updateProfile()}
                />
                <ButtonAction
                  text="Create Project"
                  action={() => methods.setOpenNewProjectModal(true)}
                />

                <ButtonAction text="Logout" action={() => methods.logOut()} />
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
                        methods.setProjectSettings({
                          id: project.id,
                          name: project.name,
                        });

                        methods.setOpenDeleteProjectModal(true);
                      }}
                      className="bg-red-500 w-auto rounded-lg py-1 px-5 text-sm border-[1px] border-black my-5 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {data.openNewProjectModal && (
        <ModalCreateProject
          projectHasBeenCreated={(e: boolean) =>
            methods.setProjectHasBeenCreated(e)
          }
          closeModal={(e: boolean) => methods.setOpenNewProjectModal(e)}
          userId={data.userSettings?.id ?? 0}
        />
      )}
      {data.openDeleteProjectModal && (
        <ModalDeleteProject
          projectSettings={data.projectSettings}
          closeModal={(e: boolean) => methods.setOpenDeleteProjectModal(e)}
        />
      )}
    </>
  );
}
