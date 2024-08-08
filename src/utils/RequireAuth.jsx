import Loading from "@/components/common/Loading";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

// RequireAuth component to protect routes by requiring authentication
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();

  // If the authentication state is still loading, display the Loading component
  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loading />
      </div>
    );
  }

  // If the user is authenticated, render the child components
  if (user) {
    return children;
  }

  // If the user is not authenticated, redirect to the login page
  return <Navigate to="/login" />;
};

export default RequireAuth;
