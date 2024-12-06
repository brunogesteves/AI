import { useInfo } from "@/contexts/context";
import { api } from "@/utils/api";
import { ISignInUser } from "@/utils/types";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const SignInLogic = () => {
  const { setUserSettings } = useInfo();
  const router = useRouter();
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [errorWarning, setErrorWarning] = useState<boolean>(false);
  const initialValues = {
    email: "",
    password: "",
  };

  function ErrorInput(input: string) {
    return (
      <div className="text-red-500 text-center">
        <ErrorMessage name={input} />
      </div>
    );
  }

  function loginUser(values: ISignInUser, actions: { resetForm: () => void }) {
    api.post(`/users/${values.email}/${values.password}`).then((res) => {
      if (res.data.status) {
        router.push("/panel");
        localStorage.setItem("token", res.data.token);
        setUserSettings(jwtDecode(res.data.token));
      } else {
        setErrorWarning(true);
        actions.resetForm();
      }
    });
  }
  return {
    data: { initialValues, isPasswordHidden, errorWarning },
    methods: { loginUser, setIsPasswordHidden, ErrorInput },
  };
};
