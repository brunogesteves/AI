import { Formik } from "formik";
import {
  GestureResponderEvent,
  Modal,
  Text,
  TextInput,
  View,
} from "react-native";

import { CreateProjectSchema } from "@/utils/yup";
import { ModalCreateProjectLogic } from "./modalCreateProject.logic";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ButtonAction, ButtonPanel } from "@/utils/buttons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ModalCreateProject() {
  const { data, methods } = ModalCreateProjectLogic();

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
              initialValues={data?.initialValues}
              validationSchema={CreateProjectSchema}
              onSubmit={(values, actions) =>
                methods.createProject(values, actions)
              }
            >
              {({ handleChange, handleSubmit }) => (
                <View
                  className={` flex flex-col justify-center items-center text-black bg-yellow-400 h-auto w-full pt-4 pb-2 px-4 rounded-xl gap-y-3 `}
                >
                  <Text>Create New Project</Text>
                  <View className="h-auto w-full">
                    <TextInput
                      onChangeText={handleChange("projectname")}
                      placeholder="Create  new Project"
                      className="rounded-lg bg-white focus:outline pl-2 placeholder:text-black border-[1px] border-black"
                    />
                    {methods.ErrorInput("projectName")}
                  </View>

                  <View className="flex justify-between items-center w-full ">
                    <ButtonAction
                      text="Create new Project"
                      action={
                        handleSubmit as unknown as (
                          e: GestureResponderEvent
                        ) => void
                      }
                    />
                  </View>
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
          text="Create Project"
          actionModal={() => methods.setModalVisible(true)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
