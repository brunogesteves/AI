"use client";
import { useInfoIUserSettingsInfo } from "@/contexts/context";
import { api } from "@/utils/api";
import { IModalCreateUpdateProps } from "@/utils/types";
import { ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const ModalCreateProjectLogic = ({
  isOpen,
  closeModal,
}: IModalCreateUpdateProps) => {
  const { userSettings } = useInfoIUserSettingsInfo();
  const modalRefProject = useRef<HTMLDialogElement>(null);

  const [openNewProjectModal, setOpenNewProjectModal] = useState<boolean>(true);

  const initialValues = {
    projectname: "",
  };

  useEffect(() => {
    if (isOpen) {
      modalRefProject.current?.showModal();
    } else {
      modalRefProject.current?.close();
    }
  }, [isOpen]);

  function ErrorInput(input: string) {
    return (
      <div className="text-yellow-500 text-center">
        <ErrorMessage name={input} />
      </div>
    );
  }

  function createProject(
    values: { projectname: string },
    actions: { resetForm: () => void }
  ) {
    console.log("chamou api front");
    api
      .post(`/projects/${values.projectname}`, {
        id: userSettings.id,
      })
      .then((res) => {
        if (res.data.status) {
          toast("Project has been Created");
        }
      })
      .finally(() => {
        closeModal(true);
      });

    actions.resetForm();
  }

  return {
    data: {
      initialValues,
      openNewProjectModal,
      modalRefProject,
    },
    methods: {
      setOpenNewProjectModal,
      ErrorInput,
      createProject,
    },
  };
};
