import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";
const ClientRoute = () => {

  const { user } = useContext(AuthContext);

  return user.role === "CLIENT"
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
};

export default ClientRoute;
