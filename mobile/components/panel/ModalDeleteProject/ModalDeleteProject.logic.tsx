import { useEffect, useState } from "react";

import { api } from "@/utils/api";
import { ProjectDataProps } from "@/utils/types";

export const ModalCreateProjectLogic = ({
  projectData,
  deletedConfirmed,
}: {
  projectData: ProjectDataProps;
  deletedConfirmed: (newState: boolean) => void;
}) => {
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [confirmationDeleteProject, setConfirmationDeleteProject] =
    useState<boolean>(false);

  function deleteProject() {
    const { id } = projectData;

    api.delete(`/project/${id}`).then((res) => {
      if (res.data.status) {
        setConfirmationDeleteProject(false);
        setModalVisible(false);
        deletedConfirmed(true);
      }
    });
  }

  useEffect(() => {
    if (confirmationMessage === `I want to delete ${projectData.name}`) {
      setConfirmationDeleteProject(true);
    }
  }, [confirmationMessage]);

  return {
    data: {
      projectData,
      confirmationDeleteProject,
      modalVisible,
    },
    methods: {
      setConfirmationDeleteProject,
      deleteProject,
      setConfirmationMessage,
      setModalVisible,
    },
  };
};
