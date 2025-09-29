import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
// import Cookies from "js-cookie";

import { signInFormData, signInSchema } from "@/utils/yup";
import { api } from "@/utils/api";

export const Logic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [incorrectMessage, setIncorrectMessage] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "n3586@hotmail.com",
      password: "123",
    },
  });

  const onSubmit: SubmitHandler<signInFormData> = async (data) => {
    setIsLoading(true);
    console.log("api");
    try {
      router.navigate("/update");
      // api
      //   .post(`/users/${data.email}/${data.password}`, { data })
      //   .then((res: { data: { status: any } }) => {
      //     if (res.data.status) {
      //       // Cookies.set("token", res.data.token, { expires: 7 });
      //       // router.navigate("/dashboard");
      //     } else {
      //       setIncorrectMessage(true);
      //       setIsLoading(false);
      //     }
      //   });
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    data: { errors, control, isPasswordHidden, incorrectMessage, isLoading },
    methods: { register, handleSubmit, watch, onSubmit, setIsPasswordHidden },
  };
};
