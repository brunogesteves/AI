import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";

import { signInFormData, signInSchema } from "@/utils/yup";
import { api } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

export const Logic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [incorrectMessage, setIncorrectMessage] = useState(false);
  const { setSession } = useAuth();

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
      password: "1234",
    },
  });

  const onSubmit: SubmitHandler<signInFormData> = async (data) => {
    setIsLoading(true);
    try {
      api
        .post(`/users/${data.email}/${data.password}`, { data })
        .then((res: { data: { status: boolean; token: string } }) => {
          if (res.data.status) {
            setItemAsync("token", res.data?.token);
            setSession(true);
            router.navigate("/dashboard");
          } else {
            setIncorrectMessage(true);
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    data: { errors, control, isPasswordHidden, incorrectMessage, isLoading },
    methods: { register, handleSubmit, watch, onSubmit, setIsPasswordHidden },
  };
};
