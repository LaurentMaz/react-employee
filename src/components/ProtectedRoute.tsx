import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  type: string;
}

const ProtectedRoute = ({ children, type }: ProtectedRouteProps) => {
  return localStorage.getItem(type) ? children : <Navigate to={"/"} />;
};

export default ProtectedRoute;
