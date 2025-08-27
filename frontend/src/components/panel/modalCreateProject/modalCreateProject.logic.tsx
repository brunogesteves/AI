import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { IModalProps } from "@/utils/types";
import { api } from "@/utils/api";
import { createProjectFormData, createProjectSchema } from "@/utils/yup";

export const ModalCreateProjectLogic = ({
  isOpen,
  closeModal,
}: IModalProps) => {
  const modalRefProject = useRef<HTMLDialogElement>(null);

  const [openNewProjectModal, setOpenNewProjectModal] = useState<boolean>(true);

  const initialValues = {};

  useEffect(() => {
    if (isOpen) {
      modalRefProject.current?.showModal();
    } else {
      modalRefProject.current?.close();
    }
  }, [isOpen]);

  // function ErrorInput(input: string) {
  //   return (
  //     <div className="text-yellow-500 text-center">
  //       <ErrorMessage name={input} />
  //     </div>
  //   );
  // }

  // function createProject(
  //   values: { projectname: string },
  //   actions: { resetForm: () => void }
  // ) {
  //   api
  //     .post(`/project/${values.projectname}`, {
  //       id: userSettings.id,
  //     })
  //     .then((res) => {
  //       if (res.data.status) {
  //         toast("Project has been Created");
  //         closeModal(false);
  //       }
  //     })
  //     .finally(() => {
  //       closeModal(false);
  //     });

  // actions.resetForm();
  // }

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
      //   api
      // .post(`/project/${data.projectname}`, {
      //   id: data.id,
      // })
      // .then((res) => {
      //   if (res.data.status) {
      //     toast("Project has been Created");
      //     closeModal(false);
      //   }
      // })
    } catch (error) {
    } finally {
      closeModal(false);
    }
  };

  return {
    data: {
      initialValues,
      openNewProjectModal,
      modalRefProject,
      errors,
    },
    methods: {
      setOpenNewProjectModal,
      register,
      handleSubmit,
      onSubmit,
    },
  };
};
