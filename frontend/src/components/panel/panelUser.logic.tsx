"use client";
import { useInfo } from "@/contexts/context";
import { api } from "@/utils/api";
import { IProjectProps } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectDataProps {
  id: number;
  name: string;
}

export const PanelUserLogic = () => {
  const { userSettings } = useInfo();
  const router = useRouter();
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const [openNewProjectModal, setOpenNewProjectModal] =
    useState<boolean>(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    useState<boolean>(false);
  const [allProJects, setAllProJects] = useState<IProjectProps[] | null>();
  const [projectData, setProjectData] = useState<ProjectDataProps>({
    id: 0,
    name: "",
  });
  const [confirmationDeleteProject, setConfirmationDeleteProject] =
    useState<string>("");

  useEffect(() => {
    if (userSettings.id) {
      api
        .get(`/projects/${userSettings.id}`)
        .then((res) => setAllProJects(res.data.projects));
    }
  }, [userSettings]);

  function deleteProject() {
    const { id, name } = projectData;

    if (confirmationDeleteProject == `I want to delete ${name}`) {
      api.delete(`/projects/${id}`).then((res) => {
        if (res.data.status)
          setAllProJects(allProJects?.filter((project) => project.id !== id));
        deleteModalRef.current?.close();
        setConfirmationDeleteProject("");
      });
    }
  }

  function openProject(id: number) {
    router.push(`/project/${id}`);
  }

  return {
    data: {
      userSettings,
      openUpdateProfileModal,
      openNewProjectModal,
      allProJects,
      deleteModalRef,
      confirmationDeleteProject,
      projectData,
    },
    methods: {
      setOpenNewProjectModal,
      setOpenUpdateProfileModal,
      setProjectData,
      setConfirmationDeleteProject,
      deleteProject,
      openProject,
    },
  };
};
