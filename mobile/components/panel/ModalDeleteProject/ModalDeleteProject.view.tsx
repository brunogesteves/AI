import { Field, Form, Formik } from "formik";
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { CreateProjectSchema } from "@/utils/yup";
import { ModalCreateProjectLogic } from "./ModalDeleteProject.logic";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ButtonAction, ButtonPanel } from "@/utils/buttons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProjectDataProps } from "@/utils/types";

export default function ModalDeleteProject({
  projectData,
  deletedConfirmed,
}: {
  projectData: ProjectDataProps;
  deletedConfirmed: (newState: boolean) => void;
}) {
  const { data, methods } = ModalCreateProjectLogic({
    projectData,
    deletedConfirmed,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType="none"
          transparent={true}
          visible={data.modalVisible}
        >
          <View className="bg-black opacity-50 flex-1 relative"></View>
          <View className=" w-full flex justify-center items-center absolute top-0 bottom-0  m-auto">
            <View
              className={` flex flex-col justify-center items-center text-black bg-yellow-400 h-auto w-full pt-4 pb-2 px-4 rounded-xl gap-y-3`}
            >
              <View className="text-white text-center">
                <Text>If you wish to delete this project you must type :</Text>
                <Text>"I want to delete {data.projectData.name}"</Text>
              </View>
              <TextInput
                className="rounded-md focus:outline-none pl-2 bg-white w-full border-[1px]"
                // value={`Iwant to delete ${data.projectData.name}`}
                onChangeText={(e) => {
                  methods.setConfirmationMessage(e.toString());
                }}
              />
              <View className="h-9 my-2 w-full">
                <Pressable
                  onPress={() => methods.deleteProject()}
                  disabled={data.confirmationDeleteProject ? false : true}
                  className={`${
                    data.confirmationDeleteProject
                      ? "bg-blue-400"
                      : "bg-blue-100"
                  } rounded-lg flex justify-center py-1 px-5 h-full w-auto  border-[1px] border-black`}
                >
                  <Text
                    className={`text-sm text-center ${
                      data.confirmationDeleteProject
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Delete Project
                  </Text>
                </Pressable>
              </View>

              <Ionicons
                className="absolute top-1 right-1"
                name={"close-circle-outline"}
                size={32}
                color="black"
                onPress={() => {
                  methods.setModalVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => {
            methods.setModalVisible(true);
          }}
          className="bg-red-500 py-1 rounded-lg  border-[1px] border-black"
        >
          <Text className="text-white text-sm text-center"> Delete</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
