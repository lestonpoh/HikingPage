import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  currentUser: User | null;
  login: () => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

interface User {
  id: number;
  name: string;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedCurrentUser = localStorage.getItem("user");
    return savedCurrentUser ? JSON.parse(savedCurrentUser) : null;
  });

  const login = () => {
    setCurrentUser({ id: 1, name: "leston" });
  };

  const logout = () => {
    setCurrentUser(null);
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
