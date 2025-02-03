import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoading, currentUser } = useContext(AuthContext);
  console.log("se" + isLoading);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isLoading && !currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
