"use client";
import { api } from "@/utils/api";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { updateFormData, updateSchema } from "@/utils/yup";

export const UpdateProfileLogic = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());

  function inputModel(fieldName: keyof updateFormData) {
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

  function inputPasswordModel(fieldName: keyof updateFormData) {
    return (
      <div className="relative">
        <input
          type={isPasswordHidden ? "password" : "text"}
          placeholder={fieldName}
          className="inputField"
          {...register(fieldName)}
        />
        <p className="text-red-500 text-md">
          {errors[fieldName]?.message as string}
        </p>

        <div className="absolute top-4 right-2 hover:cursor-pointer ">
          {isPasswordHidden ? (
            <AiFillEyeInvisible
              onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            />
          ) : (
            <AiFillEye onClick={() => setIsPasswordHidden(!isPasswordHidden)} />
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
    reset,
  } = useForm({
    resolver: yupResolver(updateSchema),
  });
  const onSubmit: SubmitHandler<updateFormData> = async (data) => {
    try {
      api.put("/users", { data }).then((res) => {
        if (res.data.status) {
          console.table("ok");
          toast("You've Updated");
        } else {
          console.table("no ok");

          toast("Type the original Password");
        }
      });
    } catch (error) {
      console.warn(error);
    } finally {
      //   reset;
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const infoProfile: updateFormData = jwtDecode(token);
      reset({
        birthDate: infoProfile?.birthDate,
        firstname: infoProfile?.firstname,
        lastname: infoProfile?.lastname,
        id: infoProfile?.id,
      });
    }
  }, []);

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
