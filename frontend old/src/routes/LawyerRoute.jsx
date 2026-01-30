import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/authContext";

const LawyerRoute = () => {

  const { user } = useContext(AuthContext);

  if (!user || user.role !== "LAWYER") {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default LawyerRoute;
