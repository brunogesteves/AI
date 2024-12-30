import { FlatList, Pressable, Text, View } from "react-native";

import { PanelUserLogic } from "@/components/panel/panel.logic";
import { ButtonLogout, ButtonPanel } from "@/utils/buttons";
import ModalCreateProject from "./modalCreateProject/ModalCreateProject.view";
import ModalUpdateProfile from "./modalUpdateProfile/modalUpdateProfile.view";
import ModalDeleteProject from "./ModalDeleteProject/ModalDeleteProject.view";

const PanelUser = () => {
  const { data, methods } = PanelUserLogic();
  return (
    <View className="bg-yellow-400 flex-1 px-4">
      <View className="mt-5">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row">
            <Text className="text-2xl">
              Welcome {data?.userSettings?.firstname}
            </Text>
            <Text className="text-2xl pl-2 ">
              {data?.userSettings?.lastname}
            </Text>
          </View>
          <ButtonLogout
            text="Log Out"
            actionModal={() => methods.logoutAccount()}
          />
        </View>
      </View>
      <View className="h-20 my-5 gap-y-5">
        <ModalCreateProject />
        <ModalUpdateProfile />
      </View>
      <View className="mt-5">
        <Text className="text-3xl ">Projects</Text>

        {data.allProJects?.map((project) => (
          <View
            key={project.id}
            className="w-full flex flex-row justify-between items-center gap-x-3"
          >
            <View className="w-1/2 flex  ">
              <Text className="text-3xl">{project.name}</Text>
            </View>
            <View className="w-1/2 flex flex-row justify-center items-center gap-x-3 ">
              <View className="w-1/2">
                <Pressable
                  onPress={() => methods.openProject(project.id)}
                  className="bg-red-500 rounded-lg py-1 px-5 border-[1px] border-black"
                >
                  <Text className="text-white text-sm"> Open</Text>
                </Pressable>
              </View>
              <View className="w-1/2 flex-1 mt-1">
                <ModalDeleteProject
                  projectData={data.projectData}
                  deletedConfirmed={(e) => methods.setIsDeletedConfirmed(e)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default PanelUser;
