import { View } from "react-native";
import SignUpView from "./signUp/signUp.view";

const Sign = () => {
  return (
    <View className="flex-1 bg-yellow-500 flex justify-center items-center px-5">
      <SignUpView />
    </View>
  );
};

export default Sign;
