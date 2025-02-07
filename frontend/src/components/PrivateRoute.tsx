import  { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const isAuthenticated = (): boolean => {
  const userAuth = localStorage.getItem("userAuth");
  if (!userAuth) return false;

  try {
    const parsed = JSON.parse(userAuth);
    const token = parsed?.data?.token;

    // Optionally validate the token here (e.g., check expiry)
    return !!token;
  } catch {
    return false;
  }
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
