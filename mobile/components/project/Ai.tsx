import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View, ActivityIndicator } from "react-native";

export default function Ai({ content }: { content: string }) {
  return (
    <View className=" flex justify-start items-start text-justify my-5 mb-1 w-full">
      <Ionicons name={"globe-outline"} size={32} color="black" />
      <Text className="text-xl">
        {" "}
        {content == "" ? (
          <ActivityIndicator
            color={"black"}
            size={"large"}
            className=" flex  pr-5 items-end w-full "
          />
        ) : (
          content
        )}
      </Text>
    </View>
  );
}
