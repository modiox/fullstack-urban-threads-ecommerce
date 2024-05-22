import { useSelector } from "react-redux"
import { RootState } from "@/toolkit/store" 

const useUserState = () => {
  const { userData, isLoading, error, token, isLoggedIn, } = useSelector(
    (state) => state.userR
  )

  return { userData, isLoading, error, token, isLoggedIn }
}

export default useUserState
