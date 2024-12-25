import { useChatInfo } from "@/contexts/contextChat";
import { Pressable, Text, TextInput, View } from "react-native";

export default function InputChat() {
  const { setQuestion, askAI, question, isButtonDisabled } = useChatInfo();
  return (
    <View className="flex items-center my-2 px-2">
      <TextInput
        className="w-full bg-gray-500 rounded-lg mb-2 text-xl text-white pl-4 focus:outline-none h-14 "
        onChangeText={(e) => setQuestion(e)}
      />
      <Pressable
        className={`w-full text-xl text-black flex justify-center rounded-lg  h-14 ${
          question == ""
            ? "hover:cursor-auto  bg-yellow-500 text-white"
            : "hover:cursor-pointer bg-gray-300  hover:bg-black hover:text-white"
        }`}
        disabled={isButtonDisabled}
        onPress={() => askAI(question)}
      >
        <Text className="text-2xl font-bold text-center"> Make a Question</Text>
      </Pressable>
    </View>
  );
}
