import { FlatList, ScrollView, View } from "react-native";
import Ai from "@/components/project/Ai";
import User from "@/components/project/user";

import { useChatInfo } from "@/contexts/contextChat";
import { IConversationProps } from "@/utils/types";

export default function ChatArea() {
  const { contentConversation } = useChatInfo();

  const converse = [
    {
      user: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spe",
      ai: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spe",
    },
  ];
  return (
    <View className="bg-gray-300 w-full flex-1 p-2 rounded-lg flex items-end flex-row justify-center text-black  ">
      <FlatList
        data={contentConversation.reverse()}
        inverted
        renderItem={({
          item,
          index,
        }: {
          item: IConversationProps;
          index: number;
        }) => {
          return (
            <View key={index}>
              <User content={item?.user} />
              <Ai content={item?.ai} />
            </View>
          );
        }}
      />
    </View>
  );
}
