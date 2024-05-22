import { Outlet } from "react-router-dom";
import { Login } from "react-admin";
import useUserState from "../hooks/useUserState";


//to check if the user is logged in or not 

const ProtectedRoute = () => {

    const { isLoggedIn } = useUserState()
    return isLoggedIn ? <Outlet /> : <Login />

}
export default ProtectedRoute

