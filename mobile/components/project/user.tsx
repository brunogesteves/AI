import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

export default function User({ content }: { content: string }) {
  return (
    <View className=" flex justify-start items-start text-justify  mb-1 w-full">
      <Ionicons name={"person-outline"} size={32} color="black" />

      <Text className="text-xl">{content}</Text>
    </View>
  );
}
