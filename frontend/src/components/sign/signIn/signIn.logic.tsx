import { useInfo } from "@/contexts/context";
import { api } from "@/utils/api";
import { ISignInUser } from "@/utils/types";
import { ErrorMessage } from "formik";
import { useState } from "react";

export const SignInLogic = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [errorWarning, setErrorWarning] = useState<boolean>(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const { setIsLogged } = useInfo();
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
        setIsLogged(res.data.status);
        localStorage.setItem("token", res.data.token);
      } else {
        setErrorWarning(true);
      }
    });
    actions.resetForm();
  }
  return {
    data: { initialValues, isPasswordHidden, errorWarning },
    methods: { loginUser, setIsPasswordHidden, ErrorInput },
  };
};
