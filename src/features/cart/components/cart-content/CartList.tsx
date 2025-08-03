import { FC } from "react";
import { CartItemTypes } from "../../store/cart";
import CartItem from "./CartItem";

type CartListListProps = {
    cartData: CartItemTypes[];
};

const CartList: FC<CartListListProps> = ({ cartData }): JSX.Element => {
    return (
        <div className="cart-items-list mt-8 flex flex-col space-y-6">
            {cartData.map((item, index) => (
                <CartItem key={index} {...item} />
            ))}
        </div>
    );
};

export default CartList;
