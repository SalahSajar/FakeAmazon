import { useContext } from "react";

import { UserCartContext } from "../../customContexts/CartCtx";

import UserCartProductCard from "./UserCartProductCard";

import classes from "../../styles/Components/Global/UserCartComp.module.scss";

const UserCartComp = () => {
  const { userCart } = useContext(UserCartContext);

  return (
    <div className={classes["userCart--BLOCK"]}>
      <div className={classes["userCart_blockContent--WRAPPER"]}>
        <div className={classes["userCart_totalPrice--BLOCK"]}>
          <span className={`${classes["userCart_totalPrice--TITLE"]} xsm_font`}>
            subtotal
          </span>
          <span className={`${classes["userCart_totalPrice--EL"]} md_font`}>
            $
            {userCart.reduce((acc, userCartItem) => {
              acc = +userCartItem.price * userCartItem.amount;
              return acc;
            }, 0)}
          </span>
        </div>

        <div className={classes["userCart_products--BLOCK"]}>
          <div className={classes["userCart_products_blockContent--WRAPPER"]}>
            {userCart.map((userCartItem) => {
              return (
                <UserCartProductCard
                  key={userCartItem.asin}
                  productInfo={userCartItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartComp;
