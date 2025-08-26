import { api } from "@/utils/api";
import { IModalProps } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

export const ModalDeleteProjectLogic = ({
  projectDataToDelete,
  isOpen,
  closeModal,
}: IModalProps) => {
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const [confirmationDeleteProject, setConfirmationDeleteProject] =
    useState<string>("");

  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      deleteModalRef.current?.showModal();
    } else {
      deleteModalRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      confirmationDeleteProject ==
      `I want to delete ${projectDataToDelete?.name}`
    ) {
      setIsDeleteConfirmed(true);
    }
  }, [confirmationDeleteProject]);

  function deleteProject() {
    if (isDeleteConfirmed) {
      api.delete(`/project/${projectDataToDelete?.id}`).then((res) => {
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
      deleteModalRef,
      projectDataToDelete,
      isDeleteConfirmed,
    },
    methods: { deleteProject, setConfirmationDeleteProject },
  };
};
