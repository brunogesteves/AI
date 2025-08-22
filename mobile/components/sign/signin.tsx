import { View } from "react-native";
import SignInView from "./signIn/signIn.view";

const SignIn = () => {
  return (
    <View className="flex-1 bg-yellow-500 flex justify-center items-center px-5">
      <SignInView />
    </View>
  );
};

export default SignIn;
