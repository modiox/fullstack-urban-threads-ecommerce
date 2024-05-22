import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Login } from "react-admin"
import useUserState from "@/hooks/useUserState"

const AdminRoute = () => {
  const { isLoggedIn, userData } = useUserState()

  if (!isLoggedIn) {
    return <Login />
  }

  if (!userData?.isAdmin) {
    return <Navigate to="/dashboard/user" />
  }

  return <Outlet />
}

export default AdminRoute

