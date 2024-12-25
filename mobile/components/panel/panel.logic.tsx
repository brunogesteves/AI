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
    console.log(11111, userSettings.id);
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

  console.log(isDeletedConfirmed);

  function openProject(id: number) {
    router.push(`../project/${id}` as never);
  }

  function logoutAccount() {
    setUserSettings({
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
