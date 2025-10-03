import React, { createContext, useContext, useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";
import { IUserProps } from "@/utils/types";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  session: boolean;
  // setSession: (newState: boolean) => void;
  userSettings: IUserProps | undefined;
  verifyToken: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  session: false,
  // setSession: () => {},
  userSettings: undefined,
  verifyToken: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);

  const [userSettings, setUserSettings] = useState<IUserProps>();

  async function verifyToken() {
    const token = await getItemAsync("token");
    if (token) {
      const settings: IUserProps = jwtDecode(token);
      setSession(settings ? true : false);
      setUserSettings(settings ?? null);
    } else {
      setSession(false);
      setUserSettings(undefined);
    }
  }

  const contextData = { session, userSettings, verifyToken };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
