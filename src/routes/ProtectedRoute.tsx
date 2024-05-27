import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Login } from "react-admin";
import useUserState from "@/hooks/useUserState";

const ProtectedRoute = () => {
  const { isLoggedIn } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    } else {
      navigate('/dashboard/user', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
