import { createContext, ReactNode, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

interface User {
  id: number;
  username: string;
  email: string;
  profilePic: string;
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
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedCurrentUser = localStorage.getItem("user");
    return savedCurrentUser ? JSON.parse(savedCurrentUser) : null;
  });

  const login = (inputs: LoginInputs) => {
    return axiosInstance
      .post("/auth/login", inputs)
      .then((res) => {
        const { id, username, email, profilePic } = res.data;
        setCurrentUser({ id, username, email, profilePic });
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
    if (currentUser != null) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
