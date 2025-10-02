import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

// import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getItemAsync } from "expo-secure-store";

import { updateFormData, updateSchema } from "@/utils/yup";
import { InputBox } from "@/utils/styles";
import React from "react";
import { router } from "expo-router";
import { Colors, TextNeon } from "@/utils/fonts";
import { Pressable, Text, TextInput, View } from "react-native";

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

  function DatePicker() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    return (
      <View
        style={{
          width: "90%",
          height: 50,
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 20,
          gap: 10,
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
            fontSize: 20,
            color: "#fff",
            textShadowColor: "#22d3ee",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 12,
            opacity: 0.7,
            textAlign: "left",
          }}
          onPress={() => setShowPicker(true)}
        >
          {currentDate.toLocaleDateString()}
        </Text>
      </View>
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

  useEffect(() => {
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
    // async function getToken() {
  }, []);

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
