import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoading, currentUser } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isLoading && !currentUser?.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
