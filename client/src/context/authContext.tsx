import { createContext, ReactNode, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useCookies } from "react-cookie";

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => void;
  isLoading: Boolean;
}

interface Props {
  children: ReactNode;
}

interface User {
  username: string;
  isAdmin: Boolean;
}

interface LoginInputs {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => Promise.resolve(),
  logout: () => {},
  isLoading: false,
});

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["accessToken"]);

  const login = (inputs: LoginInputs) => {
    return axiosInstance
      .post("/auth/login", inputs)
      .then((res) => {
        const { username, isAdmin } = res.data;
        setCurrentUser({ username, isAdmin });
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
    const accesstoken = cookies.accessToken;

    if (accesstoken) {
      axiosInstance
        .get("/auth/validateUser")
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setCurrentUser(null);
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
