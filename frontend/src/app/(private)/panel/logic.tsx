import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  IProjectProps,
  IUserProps,
  // ProjectDataToDeleteProps,
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
  const [projectSettings, setProjectSettings] = useState<
    IProjectProps | undefined
  >();

  const [openDeleteProjectModal, setOpenDeleteProjectModal] =
    useState<boolean>(false);
  const [projectHasBeenCreated, setProjectHasBeenCreated] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState<boolean>(false);
  function openProject(id: number) {
    router.push(`/project/${id}`);
  }

  function updateProfile() {
    router.push(`/update`);
  }

  function logOut() {
    Cookies.remove("token");
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUserSettings(jwtDecode(token));
    }
  }, []);

  useEffect(() => {
    if (userSettings?.id || projectHasBeenCreated) {
      api
        .get(`/project/${userSettings?.id}`)
        .then((res) => setAllProJects(res.data.projects));
    }
  }, [userSettings, projectHasBeenCreated, isDeleteConfirmed]);
  return {
    data: {
      userSettings,
      openNewProjectModal,
      openUpdateProfileModal,
      allProJects,
      projectSettings,
      openDeleteProjectModal,
    },
    methods: {
      setOpenUpdateProfileModal,
      setOpenNewProjectModal,
      openProject,
      setProjectSettings,
      setOpenDeleteProjectModal,
      updateProfile,
      setProjectHasBeenCreated,
      logOut,
      setIsDeleteConfirmed,
    },
  };
};
