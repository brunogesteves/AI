import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { api } from "@/utils/api";
import { createProjectFormData, createProjectSchema } from "@/utils/yup";
import { ICreateProjectProps } from "@/utils/types";

export const ModalCreateProjectLogic = ({
  closeModal,
  projectHasBeenCreated,
  id,
}: ICreateProjectProps) => {
  const [openNewProjectModal, setOpenNewProjectModal] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProjectSchema),
    defaultValues: {
      projectname: "",
    },
  });
  const onSubmit: SubmitHandler<createProjectFormData> = async (data) => {
    try {
      api
        .post(`/project/${data.projectname}`, {
          id: id,
        })
        .then((res) => {
          if (res.data.status) {
            projectHasBeenCreated(true);
            closeModal(false);
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return {
    data: {
      openNewProjectModal,
      errors,
      projectHasBeenCreated,
    },
    methods: {
      setOpenNewProjectModal,
      register,
      handleSubmit,
      onSubmit,
    },
  };
};
