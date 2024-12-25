import { IUserProps, IUserSettingsProps } from "../utils/types";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "expo-router";

const DefaultUserSettings = createContext<IUserSettingsProps>({
  userSettings: {
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    generations: 0,
  },
  setUserSettings: () => {},
  isRegistered: false,
  setIsRegistered: () => {},
});

const UserSettingsProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [userSettings, setUserSettings] = useState<IUserProps>({
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    generations: 0,
  });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    console.log(userSettings);
    if (userSettings.firstname !== "") {
      router.push("/panel" as never);
    } else {
      setIsRegistered(false);
    }
  }, [userSettings]);

  const value = {
    userSettings,
    setUserSettings,
    isRegistered,
    setIsRegistered,
  };
  return (
    <DefaultUserSettings.Provider value={value}>
      {children}
    </DefaultUserSettings.Provider>
  );
};

const useInfoIUserSettingsInfo = () => {
  const useInfo = useContext(DefaultUserSettings);
  return useInfo;
};

export { UserSettingsProvider, useInfoIUserSettingsInfo };
