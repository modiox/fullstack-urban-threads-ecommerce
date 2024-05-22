import { useSelector } from "react-redux";
import { RootState } from '@/services/toolkit/store';

const useCategoryState = () => {
  const { categories, isLoading, error, totalPages, category } = useSelector(
    (state: RootState) => state.categoryR
  );

  return { categories, isLoading, error, totalPages, category };
}

export default useCategoryState;
