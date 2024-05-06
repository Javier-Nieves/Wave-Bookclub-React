import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLoggedIn) navigate("/");
    },
    [isLoggedIn, navigate]
  );

  return isLoggedIn ? children : null;
}

export default ProtectedRoutes;
