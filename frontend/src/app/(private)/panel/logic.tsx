import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  IProjectProps,
  IUserProps,
  ProjectDataToDeleteProps,
} from "@/utils/types";
import { api } from "@/utils/api";

export const PanelLogic = () => {
  const router = useRouter();

  const [userSettings, setUserSettings] = useState<IUserProps>();
  const [openNewProjectModal, setOpenNewProjectModal] =
    useState<boolean>(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    useState<boolean>(false);
  const [allProJects, setAllProJects] = useState<IProjectProps[]>([]);
  const [projectDataToDelete, setProjectDataToDelete] =
    useState<ProjectDataToDeleteProps>({
      id: 0,
      name: "",
    });
  const [openDeleteProjectModal, setOpenDeleteProjectModal] =
    useState<boolean>(false);

  function openProject(id: number) {
    router.push(`/project/${id}`);
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUserSettings(jwtDecode(token));
      console.log("token: ", jwtDecode(token));
    }
  }, []);

  useEffect(() => {
    if (userSettings?.id) {
      api
        .get(`/project/${userSettings.id}`)
        .then((res) => setAllProJects(res.data.projects));
    }
  }, [userSettings]);
  return {
    data: {
      userSettings,
      openNewProjectModal,
      openUpdateProfileModal,
      allProJects,
      projectDataToDelete,
      openDeleteProjectModal,
    },
    methods: {
      setOpenUpdateProfileModal,
      setOpenNewProjectModal,
      openProject,
      setProjectDataToDelete,
      setOpenDeleteProjectModal,
    },
  };
};
