import { api } from "@/utils/api";
import { ISignInUser } from "@/utils/types";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignInLogic = () => {
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
    // const { email , password  } = values;
    api.post(`/users/n3586@hotmail.com/1234`).then((res) => {
      if (res.data.status) {
        localStorage.setItem("token", res.data.token);

        router.push("/panel");
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
