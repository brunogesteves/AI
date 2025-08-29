import { api } from "@/utils/api";
import { IDeleteProjectProps } from "@/utils/types";
import { useEffect, useState } from "react";

export const ModalDeleteProjectLogic = ({
  projectSettings,
  closeModal,
  isDeleteConfirmed,
}: IDeleteProjectProps) => {
  const [confirmationDeleteProject, setConfirmationDeleteProject] =
    useState<string>("");

  const [isDeleteBeenConfirmed, setIsDeleteBeenConfirmed] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      confirmationDeleteProject == `I want to delete ${projectSettings?.name}`
    ) {
      setIsDeleteBeenConfirmed(true);
    }
  }, [confirmationDeleteProject]);

  function deleteProject() {
    console.log("delete");
    api.delete(`/project/${projectSettings?.id}`).then((res) => {
      if (res.data.status) {
        closeModal(false);
        setConfirmationDeleteProject("");
        isDeleteConfirmed(true);
      }
    });
  }
  return {
    data: {
      confirmationDeleteProject,
      projectSettings,
      isDeleteBeenConfirmed,
    },
    methods: { deleteProject, setConfirmationDeleteProject },
  };
};
