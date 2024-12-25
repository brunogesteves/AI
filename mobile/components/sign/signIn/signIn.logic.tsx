import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ErrorMessage } from "formik";
import { Text, View } from "react-native";

import { useInfoIUserSettingsInfo } from "@/contexts/contextUser";
import { ISignInUser, IUserProps } from "@/utils/types";
import { api } from "@/utils/api";

export const SignInLogic = () => {
  const { setUserSettings, setIsRegistered } = useInfoIUserSettingsInfo();
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false);
  const [errorWarning, setErrorWarning] = useState<boolean>(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  function ErrorInput(input: string) {
    return (
      <View>
        <Text className="text-red-500 ">
          <ErrorMessage name={input} />
        </Text>
      </View>
    );
  }

  async function loginUser(
    values: ISignInUser,
    actions: { resetForm: () => void }
  ) {
    const { email, password } = values;
    try {
      await api.post(`/users/n3586@hotmail.com/1234`).then((res) => {
        if (res.data.status) {
          console.log(11111);
          const tokenSettings: IUserProps = jwtDecode(res.data.token);
          setUserSettings({
            id: tokenSettings.id,
            firstname: tokenSettings.firstname,
            lastname: tokenSettings.lastname,
            birthDate: tokenSettings.birthDate,
            email: tokenSettings.email,
            generations: tokenSettings.generations,
          });
          console.log(22222, res.data.token);
        } else {
          setErrorWarning(true);
          actions.resetForm();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    data: {
      initialValues,
      isPasswordHidden,
      errorWarning,
      date,
      openDatePicker,
    },
    methods: {
      loginUser,
      setIsPasswordHidden,
      ErrorInput,
      setIsRegistered,
      setOpenDatePicker,
      setDate,
    },
  };
};
