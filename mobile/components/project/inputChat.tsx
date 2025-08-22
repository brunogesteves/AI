import { useChatInfo } from "@/contexts/contextChat";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

export default function InputChat() {
  const router = useRouter();

  const { setQuestion, askAI, question } = useChatInfo();
  return (
    <View className="flex items-center my-2 px-2 ">
      <TextInput
        className="w-full bg-gray-500 rounded-lg mb-2 text-xl placeholder:text-gray-50 text-white pl-4 focus:outline-none h-14 "
        onChangeText={(e) => setQuestion(e)}
        placeholder="Make a question"
        value={question}
      />
      <View className="flex flex-row justify-between  w-full">
        <Pressable
          className={`w-2/3 text-xl text-black flex justify-center rounded-lg  h-14 ${
            question == ""
              ? "hover:cursor-pointer bg-gray-300  hover:bg-black hover:text-white"
              : "hover:cursor-auto  bg-yellow-500 text-white"
          }`}
          disabled={question === "" ? true : false}
          onPress={() => askAI(question)}
        >
          <Text className="text-2xl font-bold text-center">
            {" "}
            Make a Question
          </Text>
        </Pressable>
        <Pressable
          className="w-1/4 text-xl text-black flex justify-center rounded-lg  h-14  hover:cursor-auto  bg-green-500 "
          disabled={question === "" ? true : false}
          onPress={() => router.push(`../panel/` as never)}
        >
          <Text className="text-2xl font-bold text-center"> Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
