import { RootState } from "@/services/toolkit/store";
import { UseSelector, useSelector } from "react-redux";

const useCartState = () => {
    const {cartItems} = useSelector((state:RootState) => state.cartR)
    return {cartItems}
}
export default useCartState;