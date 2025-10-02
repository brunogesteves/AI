import React, { createContext, useContext, useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";

const AuthContext = createContext({
  session: false,
  setSession: (newState: boolean) => {},
  user: "",
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      const token = await getItemAsync("token");
      setUser(token ?? "");
    };

    getToken();
  }, [session]);

  const contextData = { session, setSession, user };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
