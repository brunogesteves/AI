"use client";
import { useInfoIUserSettingsInfo } from "@/contexts/contextUser";
import { IUserProps } from "@/utils/types";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { Text, ToastAndroid, View } from "react-native";

import { api } from "@/utils/api";

export const ModalUpdateProfileLogic = () => {
  const { userSettings } = useInfoIUserSettingsInfo();
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] =
    useState<boolean>(true);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);

  function ErrorInput(input: string) {
    return (
      <View className="text-yellow-500 text-center">
        <Text>
          {" "}
          <ErrorMessage name={input} />
        </Text>
      </View>
    );
  }

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "Profile has Been Updated !",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  function updateUser(values: IUserProps) {
    const { email } = values;
    api.put(`/users/${email}`, { values }).then((res) => {
      if (res.data.status) {
        showToast();
      }
    });
  }

  return {
    data: {
      userSettings,
      openUpdateProfileModal,
      isPasswordHidden,
      openDatePicker,
      modalVisible,
    },
    methods: {
      setOpenUpdateProfileModal,
      ErrorInput,
      updateUser,
      setIsPasswordHidden,
      setOpenDatePicker,
      showToast,
      setModalVisible,
    },
  };
};
