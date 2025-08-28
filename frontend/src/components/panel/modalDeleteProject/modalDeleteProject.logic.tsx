import { api } from "@/utils/api";
import { IDeleteProjectProps } from "@/utils/types";
import { useEffect, useState } from "react";

export const ModalDeleteProjectLogic = ({
  projectSettings,
  closeModal,
}: IDeleteProjectProps) => {
  const [confirmationDeleteProject, setConfirmationDeleteProject] =
    useState<string>("");

  const [isDeleteBeenConfirmed, setIsDeleteConfirmed] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      confirmationDeleteProject == `I want to delete ${projectSettings?.name}`
    ) {
      isDeleteBeenConfirmed(true);
    }
  }, [confirmationDeleteProject]);

  function deleteProject() {
    if (isDeleteConfirmed) {
      api.delete(`/project/${projectSettings?.id}`).then((res) => {
        if (res.data.status) {
          closeModal(false);
          setConfirmationDeleteProject("");
        }
      });
    }
  }
  return {
    data: {
      confirmationDeleteProject,
      projectSettings,
      isDeleteConfirmed,
    },
    methods: { deleteProject, setConfirmationDeleteProject },
  };
};
