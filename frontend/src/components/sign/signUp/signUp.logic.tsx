import { api } from "@/utils/api";
import { IUserProps } from "@/utils/types";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

export const SignUpLogic = (hasSignUp: (newState: boolean) => void) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const initialValues = {
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    password: "",
  };

  const notify = () => toast("You've Registered");

  function ErrorInput(input: string) {
    return (
      <div className="text-red-500 text-center">
        <ErrorMessage name={input} />
      </div>
    );
  }

  function createUser(values: IUserProps, actions: { resetForm: () => void }) {
    api.post("/users", { values }).then((res) => {
      if (res.data.result) {
        hasSignUp(true);
        console.log("adicionado");
        notify();
      }
    });
    actions.resetForm();
  }

  return {
    data: { initialValues, isPasswordHidden },
    methods: {
      createUser,
      ErrorInput,
      setIsPasswordHidden,
    },
  };
};
