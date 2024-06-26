import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/user/useUser.js";
import Loader from "./Loader.jsx";

function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  // when user logges out - navigate to index
  useEffect(() => {
    // additional time to set user from localStorage if the page is refreshed
    const timeoutId = setTimeout(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, 300);
    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : <Loader />;
}

export default ProtectedRoutes;
