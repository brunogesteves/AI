import { Text, View, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Controller } from "react-hook-form";

import { Bg, ButtonSubmit, InputBox, styles } from "@/utils/styles";
import { Logic } from "@/app/index/logic";
import { Colors, TextNeon } from "@/utils/fonts";

export default function App() {
  const { data, methods } = Logic();
  return (
    <Bg>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
            <Image
              source={require("./../../../assets/images/logotype.png")}
              style={styles.logo}
            />

            <TextNeon text="NEUROSPARK" fontSize={50} color={Colors.Neon} />
            <TextNeon text="Sign In" fontSize={20} color={Colors.Neon} />

            <Controller
              control={data.control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputBox
                  placeholder="email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasSecureTextEntry={false}
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
                <InputBox
                  placeholder="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  hasSecureTextEntry={true}
                />
              )}
              name="password"
            />
            {data.errors.password && <Text>This is required.</Text>}
            <TextNeon
              text={
                data.incorrectMessage ? "Email and/or password incorrect" : ""
              }
              color={Colors.Neon}
              fontSize={20}
            />
            <ButtonSubmit
              title="Submit"
              onPress={methods.handleSubmit(methods.onSubmit)}
            />

            <TextNeon text="have account?" fontSize={25} color={Colors.Neon} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Bg>
  );
}
