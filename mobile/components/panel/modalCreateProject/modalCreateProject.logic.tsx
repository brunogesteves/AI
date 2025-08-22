"use client";
import { useState } from "react";
import { ErrorMessage } from "formik";
import { Text, View } from "react-native";

import { useInfoIUserSettingsInfo } from "@/contexts//contextUser";
import { api } from "@/utils/api";
import { useRouter } from "expo-router";

export const ModalCreateProjectLogic = () => {
  const router = useRouter();
  const { userSettings } = useInfoIUserSettingsInfo();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openNewProjectModal, setOpenNewProjectModal] = useState<boolean>(true);

  const initialValues = {
    projectname: "",
  };

  function ErrorInput(input: string) {
    return (
      <View className="text-yellow-500 text-center">
        <Text>
          <ErrorMessage name={input} />
        </Text>
      </View>
    );
  }

  function createProject(
    values: { projectname: string },
    actions: { resetForm: () => void }
  ) {
    api
      .post(`/project/${values.projectname}`, {
        id: userSettings.id,
      })
      .then((res) => {
        if (res.data.status) {
          router.push(`../project/${res.data.projectData.id}` as never);
        }
      })
      .finally(() => {
        setModalVisible(true);
      });

    actions.resetForm();
  }

  return {
    data: {
      initialValues,
      openNewProjectModal,
      modalVisible,
    },
    methods: {
      setOpenNewProjectModal,
      ErrorInput,
      createProject,
      setModalVisible,
    },
  };
};
