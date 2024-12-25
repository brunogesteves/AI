import { UpdateSchema } from "@/utils/yup";
import { Formik } from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ModalUpdateProfileLogic } from "./modalUpdateProfile.logic";
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { ButtonAction, ButtonPanel } from "@/utils/buttons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ModalUpdateProfile = () => {
  const { data, methods } = ModalUpdateProfileLogic();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType="none"
          transparent={true}
          visible={data.modalVisible}
        >
          <View className="bg-black opacity-50 flex-1 relative"></View>
          <View className="w-full flex justify-center items-center absolute top-0 bottom-0  m-auto">
            <Formik
              initialValues={data.userSettings}
              enableReinitialize
              validationSchema={UpdateSchema}
              onSubmit={(values) => methods.updateUser(values)}
            >
              {({ handleChange, handleSubmit, setFieldValue }) => (
                <View
                  className={` flex flex-col justify-center items-center text-black bg-yellow-400 h-auto w-full pt-4 pb-2 px-4 rounded-xl gap-y-3`}
                >
                  <Text>Update Profile</Text>
                  <View className="h-auto w-full">
                    <TextInput
                      onChangeText={handleChange("firstname")}
                      defaultValue={data.userSettings.firstname}
                      className=" bg-white h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
                    />
                    {methods.ErrorInput("firstname")}
                  </View>
                  <View className="h-auto w-full">
                    <TextInput
                      onChangeText={handleChange("lastname")}
                      defaultValue={data.userSettings.lastname}
                      className="bg-white h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
                    />
                    {methods.ErrorInput("lastname")}
                  </View>

                  <View className="h-auto relative w-full">
                    <TextInput
                      onChangeText={handleChange("password")}
                      secureTextEntry={data.isPasswordHidden ? true : false}
                      placeholder="new password"
                      className="bg-white h-18 rounded-lg focus:outline pl-2 placeholder:text-black border-[1px] border-black"
                    />
                    <Ionicons
                      className="absolute top-2 right-4"
                      name={
                        data.isPasswordHidden
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={29}
                      color="black"
                      onPress={() =>
                        methods.setIsPasswordHidden(!data.isPasswordHidden)
                      }
                    />
                    {methods.ErrorInput("password")}
                  </View>
                  <View>
                    <ButtonPanel
                      text="BirthDay"
                      actionModal={() => methods.setOpenDatePicker(true)}
                    />

                    {data.openDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={"date"}
                        is24Hour={true}
                        maximumDate={
                          new Date(
                            new Date().setUTCFullYear(
                              new Date().getFullYear() - 18
                            )
                          )
                        }
                        onChange={(event, date) => {
                          setFieldValue("birthDate", date);
                          methods.setOpenDatePicker(false);
                        }}
                      />
                    )}
                  </View>
                  {methods.ErrorInput("birthDate")}
                  <ButtonAction
                    text="Update Profile"
                    action={
                      handleSubmit as unknown as (
                        e: GestureResponderEvent
                      ) => void
                    }
                  />
                  <Ionicons
                    className="absolute top-1 right-1"
                    name={"close-circle-outline"}
                    size={32}
                    color="black"
                    onPress={() => methods.setModalVisible(false)}
                  />
                </View>
              )}
            </Formik>
          </View>
        </Modal>
        <ButtonPanel
          text="Update Profile"
          actionModal={() => methods.setModalVisible(true)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ModalUpdateProfile;
