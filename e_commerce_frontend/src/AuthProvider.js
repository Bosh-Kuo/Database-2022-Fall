import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (auth === false || !token) {
      setAuth(false);
      setToken("");
      setProfile({});
    }
  }, [auth, token]);

  const value = { auth, setAuth, token, setToken, profile, setProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
