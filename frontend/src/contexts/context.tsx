"use client";
import { useRouter, usePathname } from "next/navigation";
// import { jwtDecode } from "jwt-decode";

import { IUserProps, IUserSettingsProps } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const DefaultUserSettings = createContext<IUserSettingsProps>({
  userSettings: {
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
  },
  setUserSettings: () => {},
});

export const UserSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const recentUrl = usePathname();

  const [userSettings, setUserSettings] = useState<IUserProps>({
    birthDate: new Date(),
    email: "",
    firstname: "",
    generations: 0,
    lastname: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token: IUserProps = jwtDecode(localStorage.getItem("token") ?? "");

      const tokenSettings: IUserProps = {
        id: token.id,
        firstname: token.firstname,
        lastname: token.lastname,
        birthDate: token.birthDate,
        email: token.email,
        generations: token.generations,
      };
      setUserSettings(tokenSettings);
      router.push(`${recentUrl}`);
    } else {
      router.push("/");
    }
  }, []);

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

export function useInfoIUserSettingsInfo() {
  const useInfo = useContext(DefaultUserSettings);
  return useInfo;
}
