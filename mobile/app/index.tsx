import { Image } from "expo-image";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Text, TextInput, View } from "react-native";

import { IndexLogic } from "./logic";
import { Controller } from "react-hook-form";

const Index = () => {
  const { data, methods } = IndexLogic();

  return (
    <View
      className="flex h-screen content-between items-center max-[440px]:flex-col
    sm:items-center"
    >
      <View className="w-1/2 flex flex-col  items-center ">
        <Image source={"/assets/images/logotype.png"} alt="user" />
        <Text
          className="Orbitron neon-text
        max-[440px]:text-lg mb-5
      "
        >
          NEUROSPARK
        </Text>
      </View>
      <View className="w-1/2 flex flex-col items-center">
        <Text
          className="Orbitron 
        neon-text mb-5 text-2xl
      "
        >
          Login
        </Text>
        {/* <form
          className="flex flex-col gap-y-5 text-center"
          onSubmit={methods.handleSubmit(methods.onSubmit)}
        >
          <div>
            <input
              placeholder="email"
              className="inputField"
              {...methods.register("email")}
            />
            <p
              className="Orbitron 
             messageError neon-text"
            >
              {data.errors.email?.message}
            </p>
          </div>
          <div className="relative">
            <input
              type={data.isPasswordHidden ? "password" : "text"}
              placeholder="password"
              className="w-full inputField"
              {...methods.register("password")}
            />
            <p
              className="Orbitron 
             messageError neon-text"
            >
              {data.errors.password?.message}
            </p>

            <div className="absolute top-3 right-1 hover:cursor-pointer ">
              {data.isPasswordHidden ? (
                // <AiFillEyeInvisible
                //   size={20}
                //   color="white"
                //   onClick={() =>
                //     methods.setIsPasswordHidden(!data.isPasswordHidden)
                //   }
                // />
                      <Ionicons name="eye-off" size={32} color="green" />

              ) : (
                // <AiFillEye
                //   color="white"
                //   onClick={() =>
                //     methods.setIsPasswordHidden(!data.isPasswordHidden)
                //   }
                // />
                <Ionicons name="eye" size={32} color="green" />
              )}
            </div>
          </div>
          <p
            className="Orbitron 
        messageError neon-text"
          >
            {data.incorrectMessage ? "Email and/or password incorrect" : null}
          </p>
          <input
            type="submit"
            value={data.isLoading ? "LOADING..." : "Sign In"}
            className="Orbitron         
        mt-1
        buttonSubmit
            "
          />
        </form> */}
        <Controller
          control={data.control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {data.errors.email && <Text>This is required.</Text>}

        <Controller
          control={data.control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />

        <Button
          title="Submit"
          onPress={methods.handleSubmit(methods.onSubmit)}
        />
        <View className="w-96 text-center mt-7 neon-text text-xl">
          have account?
          <Link href={"/signup"}> Click Here</Link>
        </View>
      </View>
    </View>
  );
};

export default Index;
