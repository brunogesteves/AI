import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

// import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

import { updateFormData, updateSchema } from "@/utils/yup";
import { InputBox } from "@/utils/styles";
import React from "react";
import { router } from "expo-router";
import { Colors, TextNeon } from "@/utils/fonts";
import { TextInput, View } from "react-native";

export const UpdateProfileLogic = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(updateSchema),
  });

  function inputModel(fieldName: keyof updateFormData) {
    return (
      <>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputBox
              placeholder={fieldName}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasSecureTextEntry={false}
            />
          )}
          name={fieldName}
        />

        {errors[fieldName] && (
          <TextNeon
            text="This is required."
            color={Colors.Neon}
            fontSize={20}
          />
        )}
      </>
    );
  }

  function inputPasswordModel(fieldName: keyof updateFormData) {
    return (
      <>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputBox
              placeholder={fieldName}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasSecureTextEntry={true}
            />
          )}
          name={fieldName}
        />
        {errors[fieldName] && (
          <TextNeon
            text="This is required."
            color={Colors.Neon}
            fontSize={10}
          />
        )}
      </>
    );
  }

  const onSubmit: SubmitHandler<updateFormData> = async (data) => {
    setIsUpdating(true);
    try {
      router.navigate("/");

      // api.put("/users", { data }).then((res) => {
      //   if (res.data.status) {
      //     // toast("You've Updated");
      //     setIsUpdating(false);
      //   } else {
      //     // toast("Type the original Password");
      //     setIsUpdating(false);
      //   }
      // });
    } catch (error) {
      console.warn(error);
    } finally {
      //   reset;
    }
  };

  function DatePicker() {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    return (
      <View>
        {showPicker && (
          <DateTimePicker
            value={date}
            title="calendar"
            is24Hour={true}
            minimumDate={
              new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            }
            onChange={(
              { type }: DateTimePickerEvent,
              date?: Date | undefined
            ) => {
              if (type == "set") {
                const currentDate = date;

                setValue("birthDate", currentDate ? currentDate : new Date());
              } else {
                setShowPicker(false);
              }
              console.log(event);
              console.log(date);
            }}
          />
        )}
        <InputBox
          placeholder={"birthday"}
          onChangeText={() => console.log("object")}
          value={date.toString()}
          hasSecureTextEntry={false}
        />
      </View>
    );
  }

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     const infoProfile: updateFormData = jwtDecode(token);
  //     reset({
  //       birthDate: infoProfile?.birthDate,
  //       firstname: infoProfile?.firstname,
  //       lastname: infoProfile?.lastname,
  //       id: infoProfile?.id,
  //     });
  //   }
  // }, []);

  return {
    data: { dateSelected, isUpdating },
    methods: {
      register,
      handleSubmit,
      onSubmit,
      setIsPasswordHidden,
      inputModel,
      inputPasswordModel,
      // setValue,
      setDateSelected,
      DatePicker,
    },
  };
};
