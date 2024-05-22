import { useSelector } from "react-redux";
import { RootState } from '@/services/toolkit/store';

const useUserState = () => {
  const { userData, isLoading, error, token, isLoggedIn } = useSelector(
    (state: RootState) => state.userR
  );

  return { userData, isLoading, error, token, isLoggedIn };
}

export default useUserState;
