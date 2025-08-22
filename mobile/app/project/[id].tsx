import React, { useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useChatInfo } from "@/contexts/contextChat";
import InputChat from "@/components/project/inputChat";
import ChatArea from "@/components/project/chatArea";
import ModalFiles from "@/components/project/modalfile/modalFiles.view";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Project = () => {
  const project = useLocalSearchParams();
  const { setProjectId } = useChatInfo();
  useEffect(() => {
    setProjectId(project?.id.toString());
  }, []);
  return (
    <SafeAreaProvider>
      <View className="flex-1 ">
        <View className="bg-blue-400 h-32  flex justify-center items-center ">
          <ModalFiles />
        </View>
        <ChatArea />
        <InputChat />
      </View>
    </SafeAreaProvider>
  );
};

export default Project;
