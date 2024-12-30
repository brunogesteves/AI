import { useInfoIUserSettingsInfo } from "@/contexts/contextUser";
import { api } from "@/utils/api";
import { IUserProps } from "@/utils/types";
import { useRouter } from "expo-router";
import { ErrorMessage } from "formik";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Text, View } from "react-native";

export const SignUpLogic = () => {
  const router = useRouter();

  const { setUserSettings } = useInfoIUserSettingsInfo();
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const initialValues = {
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    password: "",
  };

  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  function ErrorInput(input: string) {
    return (
      <View>
        <Text className="text-red-500 ">
          <ErrorMessage name={input} />
        </Text>
      </View>
    );
  }

  async function createUser(
    values: IUserProps,
    actions: { resetForm: () => void }
  ) {
    try {
      await api.post("/users", { values }).then((res) => {
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

          router.push("/panel" as never);

          actions.resetForm();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  function changeToSignIn() {
    router.push("/" as never);
  }
  return {
    data: { initialValues, isPasswordHidden, date, openDatePicker },
    methods: {
      createUser,
      ErrorInput,
      setIsPasswordHidden,
      setDate,
      setOpenDatePicker,
      changeToSignIn,
    },
  };
};
