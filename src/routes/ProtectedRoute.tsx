import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Login } from "react-admin";
import useUserState from "@/hooks/useUserState";


const ProtectedRoute = () => {
  const { isLoggedIn, userData } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
      if (!isLoggedIn) {
          navigate('/login');
      } else if (!userData?.isAdmin) {
          navigate('/dashboard/user');
      }
  }, [isLoggedIn, userData, navigate]);

  if (!isLoggedIn || !userData) {
      return null; // This prevents rendering while checking auth status
  }

  return userData.isAdmin ? <Outlet /> : null; 
};

export default ProtectedRoute;
