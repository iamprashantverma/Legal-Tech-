import  { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";
import { login as loginApi } from "../service/api/auth-service";

const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");

  const initialUser = (() => {
    if (!initialToken) return null;
    try {
      return jwtDecode(initialToken);
    } catch {
      return null;
    }
  })();

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  //  LOGIN
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);

      const result = await loginApi(credentials); 
      // console.log(result);
      const authToken = result?.token;

      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(jwtDecode(authToken));

      toast.success("Login successful");
      return result;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);



  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
