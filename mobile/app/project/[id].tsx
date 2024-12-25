import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { useChatInfo } from "@/contexts/contextChat";
import InputChat from "@/components/project/inputChat";
import ChatArea from "@/components/project/chatArea";
import ModalFiles from "@/components/project/modalFiles";

const Project = () => {
  const { setIsModalopen } = useChatInfo();
  const project = useLocalSearchParams();
  const { setSlug } = useChatInfo();
  useEffect(() => {
    setSlug(project?.id.toString());
  }, []);
  return (
    <View className="flex-1 ">
      <View className="bg-blue-400 h-16 flex justify-center items-center ">
        <ModalFiles />
      </View>
      <ChatArea />
      <InputChat />
    </View>
  );
};

export default Project;
