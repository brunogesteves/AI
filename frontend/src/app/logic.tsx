import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { signInFormData, signInSchema } from "@/utils/yup";
import { api } from "@/utils/api";

export const Logic = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [incorrectMessage, setIncorrectMessage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
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
    try {
      api
        .post(`/users/${data.email}/${data.password}`, { data })
        .then((res) => {
          if (res.data.status) {
            Cookies.set("token", res.data.token, { expires: 7 });
            router.push("/dashboard");
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
    data: { errors, isPasswordHidden, incorrectMessage, isLoading },
    methods: { register, handleSubmit, watch, onSubmit, setIsPasswordHidden },
  };
};
