import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");

  const user = token;
  return user ? <Outlet /> : <Navigate to="/log-user" />;
};

export default ProtectedRoutes;
