"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, Redirect } from "expo-router";

import { useInfoIUserSettingsInfo } from "@/contexts/contextUser";
import { api } from "@/utils/api";
import { IProjectProps, ProjectDataProps } from "@/utils/types";

export const PanelUserLogic = () => {
  const { userSettings, setUserSettings } = useInfoIUserSettingsInfo();
  const router = useRouter();
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const [isDeletedConfirmed, setIsDeletedConfirmed] = useState<boolean>(true);

  const [openDeleteProjectModal, setOpenDeleteProjectModal] =
    useState<boolean>(false);
  const [allProJects, setAllProJects] = useState<IProjectProps[] | null>();
  const [projectData, setProjectData] = useState<ProjectDataProps>({
    id: 0,
    name: "",
  });

  async function getProjects() {
    try {
      if (userSettings.id) {
        await api
          .get(`/project/${userSettings.id}`)
          .then((res) => setAllProJects(res.data.projects));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isDeletedConfirmed) {
      getProjects();
    }
    setIsDeletedConfirmed(false);
  }, [isDeletedConfirmed]);

  function openProject(id: number) {
    router.push(`../project/${id}` as never);
  }

  function logoutAccount() {
    setUserSettings({
      id: 0,
      firstname: "",
      lastname: "",
      birthDate: new Date(),
      email: "",
    });
    router.push(`/` as never);
  }

  return {
    data: {
      userSettings,
      allProJects,
      deleteModalRef,
      openDeleteProjectModal,
      projectData,
      isDeletedConfirmed,
    },
    methods: {
      setProjectData,
      setOpenDeleteProjectModal,
      openProject,
      logoutAccount,
      setIsDeletedConfirmed,
    },
  };
};
