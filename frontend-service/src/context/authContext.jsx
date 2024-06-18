import React, { createContext, ReactNode, useContext, useEffect } from "react";
import useStateCallback from "../hooks/useStateCallback";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import {notification} from 'antd';

const authContextDefaultValues = {
  user: null,
  login: (data) => {},
  logout: () => {},
};
export const AuthContext = createContext(
  authContextDefaultValues
);

export function AuthProvider({ children }) {
  const [user, setUser] = useStateCallback(null);
  const navigate = useNavigate("");
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (!token) {
      if (location !== '/' && location !== '/signup')
        navigate('/');
    } else {
      if (location == '/auth/login' || location == '/dashboard/messageHandler')
        navigate('/')
    }
  }, [location]);
  
  const login = async (email, password) => {
    const api = axios
      .post("http://localhost:8000/api/v1/auth/login", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        Cookies.set("userName", data.data.user.userName, {
          expires: new Date(Date.now() + 9999999),
          httpOnly: false,
        });
        Cookies.set("accessToken", data.data.token, {
          expires: new Date(Date.now() + 9999999),
          httpOnly: false,
        });
        Cookies.set("currentUser", data.data.user.id, {
          expires: new Date(Date.now() + 9999999),
          httpOnly: false,
        });
        notification.success({ message: "Login Successful!" });
        navigate("/viewBooks");
        setUser(data.user);
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message || "Invalid Credentials!",
        });
      });
  };

  const logout = () => {
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      address: [],
      password: "",
      phoneNumber: "",
      status: "",
    });
    Cookies.remove("accessToken");
    navigate("/");
  };
  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default function useAuth() {
  return useContext(AuthContext);
}
