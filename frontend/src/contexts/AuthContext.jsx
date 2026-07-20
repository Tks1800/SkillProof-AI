import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({
      email,
      password,
    });

    const data = response.data;

    localStorage.setItem("token", data.access_token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        full_name: data.full_name,
        email: data.email,
        role: data.role,
      })
    );

    setUser({
      full_name: data.full_name,
      email: data.email,
      role: data.role,
    });

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}