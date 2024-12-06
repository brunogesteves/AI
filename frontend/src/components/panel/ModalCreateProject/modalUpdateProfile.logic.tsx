"use client";
import { useInfo } from "@/contexts/context";
import { api } from "@/utils/api";
import { IUserProps } from "@/utils/types";
import { ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const ModalUpdateProfileLogic = (isOpen: boolean) => {
  const { userSettings } = useInfo();
  const modalRefUpdate = useRef<HTMLDialogElement>(null);

  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    useState<boolean>(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      modalRefUpdate.current?.showModal();
    } else {
      modalRefUpdate.current?.close();
    }
  }, [isOpen]);

  // const notify = () =>
  function ErrorInput(input: string) {
    return (
      <div className="text-yellow-500 text-center">
        <ErrorMessage name={input} />
      </div>
    );
  }

  function updateUser(values: IUserProps, actions: { resetForm: () => void }) {
    console.log("chamou api front");
    api.put(`/users/${values.email}`, { values }).then((res) => {
      if (res.data.status) {
        console.log(res.data.status);
        toast("Profile has been Updated");
      }
    });

    actions.resetForm();
  }

  return {
    data: {
      userSettings,
      openUpdateProfileModal,
      isPasswordHidden,
      modalRefUpdate,
    },
    methods: {
      setOpenUpdateProfileModal,
      ErrorInput,
      updateUser,
      setIsPasswordHidden,
    },
  };
};
