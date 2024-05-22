// import { Outlet } from "react-router-dom";
// import { Login } from "react-admin";
// import useUserState from "../hooks/useUserState";


// //to check if the user is logged in or not 

// const ProtectedRoute = () => {

//     const { isLoggedIn } = useUserState()
//     return isLoggedIn ? <Outlet /> : <Login />

// }
// export default ProtectedRoute

import { Navigate, Outlet } from "react-router-dom"
import useUserState from "@/hooks/useUserState"

const ProtectedRoute = () => {
  const { isLoggedIn, userData } = useUserState()

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoute
