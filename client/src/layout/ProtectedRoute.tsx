import { ReactNode, useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/authContext";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  // const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default ProtectedRoute;
