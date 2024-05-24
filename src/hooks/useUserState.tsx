import { useSelector } from "react-redux";
import { RootState } from '@/services/toolkit/store';

const useUserState = () => {
  const { users,totalPages, userData, isLoading, error, token, isLoggedIn } = useSelector(
    (state: RootState) => state.userR
  );

  return { users, totalPages, userData, isLoading, error, token, isLoggedIn };
}

export default useUserState;
