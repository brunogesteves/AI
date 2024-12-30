"use client";
import { useInfoIUserSettingsInfo } from "@/contexts/context";
import { api } from "@/utils/api";
import { IProjectProps, ProjectDataToDeleteProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const PanelUserLogic = () => {
  const { userSettings } = useInfoIUserSettingsInfo();
  const router = useRouter();
  const [openNewProjectModal, setOpenNewProjectModal] =
    useState<boolean>(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    useState<boolean>(false);
  const [openDeleteProjectModal, setOpenDeleteProjectModal] =
    useState<boolean>(false);
  const [allProJects, setAllProJects] = useState<IProjectProps[] | null>();
  const [projectDataToDelete, setProjectDataToDelete] =
    useState<ProjectDataToDeleteProps>({
      id: 0,
      name: "",
    });

  function openProject(id: number) {
    router.push(`/project/${id}`);
  }

  useEffect(() => {
    if (userSettings.id) {
      api
        .get(`/project/${userSettings.id}`)
        .then((res) => setAllProJects(res.data.projects));
    }
  }, [userSettings]);

  useEffect(() => {
    if (!openDeleteProjectModal) {
      setAllProJects(
        allProJects?.filter((project) => project.id !== projectDataToDelete.id)
      );
    }
  }, [openDeleteProjectModal]);

  return {
    data: {
      userSettings,
      openUpdateProfileModal,
      openNewProjectModal,
      openDeleteProjectModal,
      allProJects,
      projectDataToDelete,
    },
    methods: {
      setOpenNewProjectModal,
      setOpenUpdateProfileModal,
      openProject,
      setOpenDeleteProjectModal,
      setProjectDataToDelete,
    },
  };
};
