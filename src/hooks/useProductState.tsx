import { useSelector } from "react-redux";
import { RootState } from '@/services/toolkit/store';

const useProductState = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  );

  return { products, isLoading, error, totalPages };
}

export default useProductState;