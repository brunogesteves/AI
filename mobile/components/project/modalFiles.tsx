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

interface FileProps {
  name: string;
  id: number;
}

export default function ModalFiles() {
  const { slug } = useChatInfo();
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState<FileProps[]>([]);
  const [image, setImage] = useState<string | null>(null);

  async function getfiles() {
    console.log("chamou arquivos");
    try {
      await api.get(`/project/files/${slug}`).then((res) => {
        setFiles(res.data.files);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (modalVisible) {
      getfiles();
    }
  }, [modalVisible]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function getDocs() {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });
    } catch (error) {
      console.log("erro doc");
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center items-center">
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View className="flex-1 justify-center items-center m-7">
            <View className="flex-1 w-full rounded-lg bg-red-500">
              <Pressable
                className="bg-green-300  mt-5 text-red-500 rounded-lg"
                onPress={pickImage}
              >
                <Text className="text-center text-2xl">
                  Pick an image from camera roll
                </Text>
              </Pressable>
              {image && <Image source={{ uri: image }} />}

              <Pressable
                className="bg-green-300  mt-5 text-red-500 rounded-lg"
                onPress={getDocs}
              >
                <Text className="text-center text-2xl">Pick an document</Text>
              </Pressable>
              <FlatList
                data={files}
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
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text className="text-white text-center text-2xl">
                        {item.name}
                      </Text>
                    </Pressable>
                    <Ionicons name="trash-outline" size={30} color="white" />
                  </View>
                )}
              />
              <Pressable
                className="bg-blue-500  h-10 w-full flex justify-center mt-5 rounded-lg"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-white text-center">Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          className="bg-yellow-300 w-4/5 text-red-500 rounded-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-center text-3xl">Files</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
