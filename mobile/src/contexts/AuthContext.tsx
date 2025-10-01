import React, { createContext, useContext, useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";

const AuthContext = createContext({
  session: false,
  setSession: (newState: boolean) => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<string | null>("");

  useEffect(() => {
    const getToken = async () => {
      if (session) setUser(await getItemAsync("token"));
    };

    getToken();
  }, []);

  const contextData = { session, setSession };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
