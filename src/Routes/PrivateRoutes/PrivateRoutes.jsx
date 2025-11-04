import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, authloading } = useAuth();
  const location = useLocation();

  if (authloading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl text-info"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }

  return children;
};

export default PrivateRoutes;
