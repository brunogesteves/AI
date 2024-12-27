import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  Pressable,
  View,
  FlatList,
  Button,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";

import { api } from "@/utils/api";
import { useChatInfo } from "@/contexts/contextChat";
import { ModalFilesLogic } from "./modalFiles.logic";

interface FileProps {
  name: string;
  id: number;
}

export default function ModalFiles() {
  const { data, methods } = ModalFilesLogic();

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center items-center">
        <Modal
          animationType="slide"
          transparent={true}
          visible={data.modalVisible}
        >
          <View className="flex-1 justify-center items-center my-7 mx-10 rounded-2xl bg-red-500">
            <View className="flex-1 w-full rounded-lg ">
              <Pressable
                className="bg-green-300 flex justify-center h-20 mb-5 rounded-lg"
                onPress={methods.getDocs}
              >
                <Text className="text-center text-2xl">Pick an document</Text>
              </Pressable>
              {data.files.length > 1 ? (
                <FlatList
                  data={data?.files}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View className="flex flex-row  justify-between px-3 mb-5 items-center ">
                      <Checkbox
                        className="m-0 bg-white"

                        // value={isChecked}
                        // onValueChange={setChecked}
                      />
                      <Pressable
                        className="my-3 py-2  bg-green-500 text-sm rounded-lg w-2/3"
                        onPress={() =>
                          methods.setModalVisible(!data.modalVisible)
                        }
                      >
                        <Text className="text-white text-center text-2xl">
                          {item.name}
                        </Text>
                      </Pressable>
                      <Ionicons name="trash-outline" size={30} color="white" />
                    </View>
                  )}
                />
              ) : (
                ""
              )}
            </View>
            <View className="w-full">
              <Pressable
                className="bg-blue-500  h-10 w-full flex justify-center mt-5 rounded-e-2xl"
                onPress={() => methods.setModalVisible(!data.modalVisible)}
              >
                <Text className="text-white text-center">Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          className="bg-yellow-300 w-4/5 text-red-500 rounded-lg"
          onPress={() => methods.setModalVisible(true)}
        >
          <Text className="text-center text-3xl">Files</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}