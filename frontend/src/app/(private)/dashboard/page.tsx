"use client";
import { FaPlus } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { MdFolderZip, MdDelete } from "react-icons/md";
import { IoOpenSharp } from "react-icons/io5";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { ButtonAction } from "@/utils/buttons";
import ModalCreateProject from "@/components/panel/modalCreateProject/ModalCreateProject.view";
import ModalDeleteProject from "@/components/panel/modalDeleteProject/modalDeleteProject.view";
import { DashBoardLogic } from "./logic";
import { orbitron } from "@/utils/fonts";

export default function DashBoard() {
  const { data, methods } = DashBoardLogic();

  return (
    <>
      <main className="min-w-screen min-h-screen p-5 ">
        <div>
          <span className="neon-text text-xl">
            Welcome {data?.userSettings?.firstname}{" "}
            {data?.userSettings?.lastname}
          </span>
          <div className="flex gap-x-2 my-5">
            <ButtonAction
              icon={<RxUpdate size={20} color="cyan" />}
              text="Update Profile"
              action={() => methods.updateProfile()}
              disable={false}
            />
            <ButtonAction
              icon={<FaPlus size={20} color="cyan" />}
              text="Create Project"
              action={() => methods.setOpenNewProjectModal(true)}
              disable={false}
            />

            <ButtonAction
              icon={<CiLogout size={20} color="cyan" />}
              text="Logout"
              action={() => methods.logOut()}
              disable={false}
            />
          </div>
        </div>
        <div className="h-[calc(100vh_-_180px)] p-4 rounded-2xl border-2 border-blue-500 ">
          <div className="h-[calc(100vh_-_213px)] overflow-y-auto">
            {data?.allProJects?.map((project, i: number) => {
              return (
                <div
                  className={`${orbitron.className} flex items-center  gap-x-3 my-5 text-white `}
                  key={i}
                >
                  <MdFolderZip color="#003cff" size={50} />
                  <span className="mx-5 w-20 text-lg">{project.name}</span>

                  <ButtonAction
                    icon={<IoOpenSharp size={20} />}
                    text="Open"
                    action={() => methods.openProject(project.id)}
                    disable={false}
                  />

                  <ButtonAction
                    icon={<MdDelete size={20} />}
                    text="Delete"
                    disable={false}
                    action={() => {
                      methods.setProjectSettings({
                        id: project.id,
                        name: project.name,
                      });

                      methods.setOpenDeleteProjectModal(true);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>

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
          isDeleteConfirmed={(e: boolean) => methods.setIsDeleteConfirmed(e)}
        />
      )}
    </>
  );
}
