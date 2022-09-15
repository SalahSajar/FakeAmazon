import React from "react";

import classes from "../../styles/Components/Search/Product_Price.module.scss";

const Product_Price = ({ price }) => {
  return price.indexOf("$") === price.lastIndexOf("$") ? (
    <div className={classes["product_price--BLOCK"]}>
      <span className={classes["product_price--WRAPPER"]}>
        <span className={classes["product_price_currency--EL"]}>$</span>
        <span className={classes["main_price_detail--EL"]}>
          {price.replace("$", "").slice(0, price.replace("$", "").indexOf("."))}
        </span>
        <span className={classes["secondary_price_detail--EL"]}>
          {price.includes(".")
            ? price.slice(price.indexOf(".") + 1, price.length)
            : "00"}
        </span>
      </span>
    </div>
  ) : (
    <div className={classes["product_price--BLOCK"]}>
      <span className={classes["product_price--WRAPPER"]}>
        <span className={`${classes["product_price_currency--EL"]} sm_font`}>
          $
        </span>
        <span className={`${classes["main_price_detail--EL"]} xxlg_font`}>
          {price
            .split("$")[2]
            .slice(
              0,
              price.slice(price.lastIndexOf("$")).replace("$", "").indexOf(".")
            )}
        </span>
        <span className={`${classes["product_price_currency--EL"]} sm_font`}>
          {price.split("$")[2].slice(price.split("$")[2].lastIndexOf(".") + 1)}
        </span>
      </span>

      <span className={`${classes["product_previous_price--EL"]} md_font`}>
        ${price.split("$")[1]}
      </span>
    </div>
  );
};

export default Product_Price;
