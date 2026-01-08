import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Unauthorized from "../pages/Unauthorized";

function ProtectedRoute({ role, children }) {
  const { userData, loading } = useContext(UserContext);

  // Show a loading spinner until userData is ready
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div class="loader"></div> 

      </div>
    );
  }

  // Once loaded, check role
  return userData?.role === role ? children : <Unauthorized />;
}

export default ProtectedRoute;