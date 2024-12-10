"use client";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import { IUserProps, IUserSettingsProps } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";

const DefaultUserSettings = createContext<IUserSettingsProps>({
  userSettings: {
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    password: "",
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
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserSettings(jwtDecode(localStorage.getItem("token") ?? ""));
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
