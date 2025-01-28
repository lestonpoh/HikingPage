import { createContext, ReactNode, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useCookies } from "react-cookie";

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

interface User {
  username: string;
}

interface LoginInputs {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cookies] = useCookies();
  const accesstoken = cookies.accessToken;

  const login = (inputs: LoginInputs) => {
    return axiosInstance
      .post("/auth/login", inputs)
      .then((res) => {
        const { username } = res.data;
        setCurrentUser(username);
      })
      .catch((err) => {
        throw err;
      });
  };

  const logout = () => {
    return axiosInstance
      .post("/auth/logout")
      .then(() => {
        setCurrentUser(null);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    if (accesstoken) {
      console.log("hello");
      axiosInstance
        .get("/auth/validateUser")
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
