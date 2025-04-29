import React, { useEffect } from "react";
import AppLayout from "./layout/AppLayout";
import { useNavigate } from "react-router-dom";

const App = () => {
  // Add your application logic here
  useEffect(() => {
    const AUTO_LOGOUT_TIME = 3000000;

    const isAuthenticated = localStorage.getItem("accessToken");

    if (isAuthenticated) {
      const autoLogoutTimer = setTimeout(() => {
        localStorage.clear();
        window.location.href = "/login";
      }, AUTO_LOGOUT_TIME);

      return () => clearTimeout(autoLogoutTimer);
    }
  }, []);

  return (
    <>
      <AppLayout />
    </>
  );
};

export default App;
