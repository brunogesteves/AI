import { useEffect, useState } from "react";

import { IProjectProps } from "@/utils/types";
import { api } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { deleteItemAsync } from "expo-secure-store";

export const DashBoardLogic = () => {
  // // const router = useRouter();
  const { userSettings, verifyToken } = useAuth();

  // const [openNewProjectModal, setOpenNewProjectModal] =
  //   useState<boolean>(false);
  // const [openUpdateProfileModal, setOpenUpdateProfileModal] =
  //   useState<boolean>(false);
  const [allProJects, setAllProJects] = useState<IProjectProps[]>([]);
  // const [projectSettings, setProjectSettings] = useState<
  //   IProjectProps | undefined
  // >();

  // const [openDeleteProjectModal, setOpenDeleteProjectModal] =
  //   useState<boolean>(false);
  const [projectHasBeenCreated, setProjectHasBeenCreated] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState<boolean>(false);

  // function openProject(id: number) {
  //   router.push(`/project/${id}`);
  // }

  function updateProfile() {
    router.navigate(`/update`);
  }

  function logOut() {
    deleteItemAsync("token");
    verifyToken();
    router.navigate(`/`);
  }

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
      // openNewProjectModal,
      // openUpdateProfileModal,
      allProJects,
      // projectSettings,
      // openDeleteProjectModal,
    },
    methods: {
      // setOpenUpdateProfileModal,
      // setOpenNewProjectModal,
      // openProject,
      // setProjectSettings,
      // setOpenDeleteProjectModal,
      updateProfile,
      // setProjectHasBeenCreated,
      logOut,
      // setIsDeleteConfirmed,
    },
  };
};
