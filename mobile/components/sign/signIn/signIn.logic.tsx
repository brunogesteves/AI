import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ErrorMessage } from "formik";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { useInfoIUserSettingsInfo } from "@/contexts/contextUser";
import { ISignInUser, IUserProps } from "@/utils/types";
import { api } from "@/utils/api";

export const SignInLogic = () => {
  const router = useRouter();

  const { setUserSettings } = useInfoIUserSettingsInfo();
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
          const tokenSettings: IUserProps = jwtDecode(res.data.token);
          setUserSettings({
            id: tokenSettings.id,
            firstname: tokenSettings.firstname,
            lastname: tokenSettings.lastname,
            birthDate: tokenSettings.birthDate,
            email: tokenSettings.email,
            generations: tokenSettings.generations,
          });
        } else {
          setErrorWarning(true);
          actions.resetForm();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  function changeToSignUp() {
    router.push("/signup" as never);
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
      setOpenDatePicker,
      setDate,
      changeToSignUp,
    },
  };
};
