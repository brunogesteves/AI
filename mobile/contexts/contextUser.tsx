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

  useEffect(() => {
    if (userSettings.firstname !== "") {
      router.push("/panel" as never);
    } else {
    }
  }, [userSettings]);

  const value = {
    userSettings,
    setUserSettings,
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
