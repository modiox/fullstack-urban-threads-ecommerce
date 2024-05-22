import { useSelector } from "react-redux";
import { RootState } from '@/services/toolkit/store';

const useProductState = () => {
  const { userData, isLoading, error, totalPages, isLoggedIn } = useSelector(
    (state: RootState) => state.userR
  );

  return { userData, isLoading, error, totalPages, isLoggedIn };
}

export default useProductState;