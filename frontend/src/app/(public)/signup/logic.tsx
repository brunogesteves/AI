"use client";
import { api } from "@/utils/api";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { signUpFormData, signUpSchema } from "@/utils/yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const SignUpLogic = () => {
  const router = useRouter();

  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());

  function inputModel(fieldName: keyof signUpFormData) {
    return (
      <div>
        <input
          placeholder={fieldName}
          className="inputField"
          {...register(fieldName)}
        />
        <p className="text-red-500 text-md">
          {errors[fieldName]?.message as string}
        </p>
      </div>
    );
  }

  function inputPasswordModel(fieldName: keyof signUpFormData) {
    return (
      <div className="w-96 relative">
        <input
          type={isPasswordHidden ? "password" : "text"}
          placeholder={fieldName}
          className="inputField"
          {...register(fieldName)}
        />
        <p className="text-red-500 text-md">
          {errors[fieldName]?.message as string}
        </p>

        <div className="absolute top-3 right-2 hover:cursor-pointer ">
          {isPasswordHidden ? (
            <AiFillEyeInvisible
              size={20}
              color="white"
              onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            />
          ) : (
            <AiFillEye
              size={20}
              color="white"
              onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            />
          )}
        </div>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<signUpFormData> = async (data) => {
    try {
      api.post("/users", { data }).then((res) => {
        if (res.data.status) {
          console.table("ok");
          router.push("/dashboard");
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    data: { dateSelected },
    methods: {
      register,
      handleSubmit,
      watch,
      onSubmit,
      setIsPasswordHidden,
      inputModel,
      inputPasswordModel,
      setValue,
      setDateSelected,
    },
  };
};
