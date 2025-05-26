import { useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../contexts/appContext";

const AuthChecker = () => {
  const { logout, currentUser } = useContext(AppContext);
  const location = useLocation();

  const removeCurrentUser = useCallback(() => {
    logout();
    alert("Your session has expired, please login again.");
    // setTimeout(() => {
    //   window.location.reload(); // Reload the page to reflect the logout
    // }, 1000);
  }, [logout]);

  useEffect(() => {
    const checkAuth = async () => {
      if (currentUser) {
        try {
          console.log("Checking authentication...");
          await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/validate`
            // {
            //   headers: {Authorization: `Bearer ${currentUser.token}`},
            // }
          );
          console.log("Authentication valid.");
        } catch (err) {
          console.error(err.response.data.message);
          if (err.response?.status === 401) {
            removeCurrentUser();
          }
        }
      }
    };

    checkAuth();
  }, [location, currentUser, removeCurrentUser]);

  return null;
};

export default AuthChecker;
