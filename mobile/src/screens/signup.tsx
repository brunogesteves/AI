import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { yupResolver } from "@hookform/resolvers/yup";

import { signUpFormData, signUpSchema } from "@/utils/yup";
import { InputBox } from "@/utils/styles";
import React from "react";
import { router } from "expo-router";
import { Colors, CustomText, orbitronFont } from "@/utils/fonts";
import { Text, View } from "react-native";

export const SignUpLogic = () => {
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
    resolver: yupResolver(signUpSchema),
  });

  function inputModel(fieldName: keyof signUpFormData) {
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
          <CustomText
            text="This is required."
            color={Colors.Neon}
            fontSize={20}
          />
        )}
      </>
    );
  }

  function inputPasswordModel(fieldName: keyof signUpFormData) {
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
          <CustomText
            text="This is required."
            color={Colors.Neon}
            fontSize={10}
          />
        )}
      </>
    );
  }

  function DatePicker() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    orbitronFont();
    return (
      <View
        style={{
          width: "90%",
          height: 50,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
          marginTop: 20,
        }}
      >
        {showPicker && (
          <DateTimePicker
            value={currentDate}
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
                setCurrentDate(currentDate ? currentDate : new Date());
              } else {
                setShowPicker(false);
              }
              console.log(event);
              console.log(date);
            }}
          />
        )}
        <Text
          style={{
            width: "90%",
            height: 50,
            borderWidth: 1,
            borderColor: "#0891b2",
            borderRadius: 8,
            padding: 8,
            paddingStart: 20,
            fontSize: 14,
            color: "#fff",
            textShadowColor: "#22d3ee",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 12,
            opacity: 0.7,
            textAlign: "left",
            fontFamily: "Orbitron",
            paddingTop: 15,
          }}
          onPress={() => setShowPicker(true)}
        >
          {currentDate.toLocaleDateString()}
        </Text>
      </View>
    );
  }

  const onSubmit: SubmitHandler<signUpFormData> = async (data) => {
    try {
      api.post("/users", { data }).then((res) => {
        if (res.data.status) {
          router.navigate("/dashboard");
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    data: { dateSelected, isUpdating },
    methods: {
      register,
      handleSubmit,
      onSubmit,
      setIsPasswordHidden,
      inputModel,
      inputPasswordModel,
      setDateSelected,
      DatePicker,
    },
  };
};
