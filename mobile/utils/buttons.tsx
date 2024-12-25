import { GestureResponderEvent, Pressable, Text, View } from "react-native";
interface ButtonActionProps {
  text: string;
  action?: (e: GestureResponderEvent) => void;
  actionModal?: () => void;
}

export const ButtonAction = ({ text, action }: ButtonActionProps) => {
  return (
    <View className="h-9 w-full">
      <Pressable
        onPress={action}
        className="bg-blue-400 rounded-lg flex justify-center py-1 px-5 h-full w-auto  border-[1px] border-black"
      >
        <Text className="text-sm text-center text-white">{text}</Text>
      </Pressable>
    </View>
  );
};

export const ButtonPanel = ({ text, actionModal }: ButtonActionProps) => {
  return (
    <View className="h-9 my-2 w-full">
      <Pressable
        onPress={actionModal}
        className="bg-blue-400 rounded-lg flex justify-center py-1 px-5 h-full w-auto  border-[1px] border-black"
      >
        <Text className="text-sm text-center text-white">{text}</Text>
      </Pressable>
    </View>
  );
};

export const ButtonLogout = ({ text, actionModal }: ButtonActionProps) => {
  return (
    <View className="h-9 my-2 w-1/4">
      <Pressable
        onPress={actionModal}
        className="bg-blue-400 rounded-lg flex justify-center py-1 px-5 h-full w-auto  border-[1px] border-black"
      >
        <Text className="text-sm text-center text-white">{text}</Text>
      </Pressable>
    </View>
  );
};
