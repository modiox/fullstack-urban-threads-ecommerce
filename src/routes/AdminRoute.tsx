import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Login } from "react-admin";
import useUserState from "@/hooks/useUserState";
import { useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const { isLoggedIn, userData } = useUserState();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login', { replace: true });
    return null;
  }

  if (!userData?.isAdmin) {
    navigate('/dashboard/user', { replace: true });
    return null;
  }

  return <Outlet />;
};

export default AdminRoute;
