import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/currentUserStore";
import { paths } from "../utils/paths";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useUserStore((state) => state.user);

  return user ? children : <Navigate to={paths.HOME} replace />;
};
