import Loading from "@/components/common/Loading";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  let location = useLocation();
  console.log(user);
  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loading />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default RequireAuth;
