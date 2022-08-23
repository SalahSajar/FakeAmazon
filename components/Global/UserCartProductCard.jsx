import { useState, useEffect, useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { UserCartContext } from "../../customContexts/CartCtx";

import classes from "../../styles/Components/Global/UserCartProductCard.module.scss";

const UserCartProductCard = ({ productInfo }) => {
  const productAsin = productInfo.asin;
  const [userCartLengthDropdownIsOpen, setUserCartLengthDropdownIsOpen] =
    useState(false);
  const [customCartProductLengthMode, setCustomCartProductLengthMode] =
    useState(false);
  const [
    customCartProductLengthIsChanged,
    setCustomCartProductLengthIsChanged,
  ] = useState(false);

  const { updateCartProductAmount__HANDLER, deleteCartProduct__HANDLER } =
    useContext(UserCartContext);

  const toggleUserCartLengthDropdown__HANDLER = () =>
    setUserCartLengthDropdownIsOpen((prev) => !prev);

  const submitUpdatedProductAmount__HANDLER = (evt) => {
    evt.preventDefault();

    const updatedProductAmount = +evt.target.productAmount.value;

    console.log("------------- updatedProductAmount -------------");
    console.log(updatedProductAmount);

    if (!!updatedProductAmount) {
      updateCartProductAmount__HANDLER(productInfo.asin, updatedProductAmount);
      setCustomCartProductLengthMode(false);
      setCustomCartProductLengthIsChanged(false);
    }
  };

  useEffect(() => {
    const productLengthsDropdown__BTN = document.getElementById(productAsin);

    document.addEventListener("click", (evt) => {
      const clickedElement = evt.target;

      if (productLengthsDropdown__BTN?.contains(clickedElement)) {
        return;
      }

      if (
        !clickedElement.classList.contains(
          classes["userCart_product_lengthUpdate_dropdown--EL"]
        )
      ) {
        setUserCartLengthDropdownIsOpen(false);
        return;
      }
    });
  }, [productAsin]);

  return (
    <div className={classes["userCart_product--CARD"]}>
      <div className={classes["userCart_product_cardContent--WRAPPER"]}>
        <div className={classes["userCart_product_link--WRAPPER"]}>
          <Link href={`/dp?asin=${productAsin}`}>
            <a className={classes["userCart_product--LINK"]}>
              <span className={classes["userCart_product_img--WRAPPER"]}>
                <Image
                  src={productInfo.img}
                  layout="fill"
                  objectFit="contain"
                  alt={productInfo.name}
                />
              </span>
              <span
                className={`${classes["userCart_product_price--EL"]} md_font`}
              >
                ${productInfo.price}
              </span>
            </a>
          </Link>
          <div className={`${classes["userCart_product_sideLink--BLOCK"]}`}>
            <Link href={`/dp?asin=${productAsin}`}>
              <a
                className={`${classes["userCart_product--SIDE-LINK"]} md_font`}
              >
                {" "}
                view product details
              </a>
            </Link>
          </div>
        </div>

        {/* {userCartIsLoading ? (
          <div className={classes["userCart_product_loading--BLOCK"]}>
            <span className={classes["userCart_product_loading_icon--WRAPPER"]}>
              <Image
                src="/icons/dark-loading-circle.gif"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="loading"
              />
            </span>
          </div>
        ) : (
          ""
        )} */}

        <div className={`${classes["userCart_product_lengthUpdate--BLOCK"]}`}>
          <div
            className={
              classes["userCart_product_lengthUpdate_blockContent--CONTAINER"]
            }
          >
            <div
              className={
                classes["userCart_product_lengthUpdate_dropdown--BLOCK"]
              }
            >
              <form
                className={`${classes["userCart_product_customLength--FORM"]} ${
                  !customCartProductLengthMode &&
                  classes["hide_userCart_product_customLength_form"]
                }`}
                onSubmit={submitUpdatedProductAmount__HANDLER}
              >
                <input
                  type="number"
                  className={`${classes["userCart_product_customLength--INPUT"]} md_font`}
                  min="0"
                  id="productAmount"
                  name="productAmount"
                  defaultValue={productInfo.amount}
                  onChange={() => setCustomCartProductLengthIsChanged(true)}
                />

                {customCartProductLengthIsChanged ? (
                  <button
                    type="submit"
                    className={`${classes["userCart_product_customLength_form--BTN"]} xsm_font`}
                  >
                    Update
                  </button>
                ) : (
                  ""
                )}
              </form>

              <button
                id={productInfo.asin}
                className={`
                  ${classes["userCart_product_lengthUpdate--BTN"]} 
                  ${classes["userCart_product_lengthUpdate_dropdown--BTN"]} 
                  ${
                    customCartProductLengthMode &&
                    classes["hide_userCart_product_lengthUpdate_dropdown_block"]
                  }`}
                onClick={toggleUserCartLengthDropdown__HANDLER}
              >
                <div
                  className={
                    classes[
                      "userCart_product_lengthUpdate_dropdown_btnContent--WRAPPER"
                    ]
                  }
                >
                  <span
                    className={`${classes["userCart_product_length--EL"]} sm_font`}
                  >
                    {productInfo.amount}
                  </span>
                  <i
                    className={
                      classes["userCart_product_lengthUpdate_dropdown--ICON"]
                    }
                  ></i>
                </div>
              </button>

              {userCartLengthDropdownIsOpen && (
                <div
                  className={
                    classes["userCart_product_lengthUpdate_dropdown--EL"]
                  }
                >
                  <ul
                    className={`${classes["product_lengths_options--LIST"]} sm_font`}
                  >
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            deleteCartProduct__HANDLER(productInfo.asin)
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          0 (Delete)
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              1
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          1
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              2
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          2
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              3
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          3
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              4
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          4
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              5
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          5
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              6
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          6
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              7
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          7
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              8
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          8
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() =>
                            updateCartProductAmount__HANDLER(
                              productInfo.asin,
                              9
                            )
                          }
                          className={`${classes["product_length_option"]}`}
                        >
                          9
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="javascript:void(0)">
                        <a
                          onClick={() => setCustomCartProductLengthMode(true)}
                          className={`${classes["product_length_option"]} ${classes["product_tenPlus_option"]}`}
                        >
                          10+
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => deleteCartProduct__HANDLER(productInfo.asin)}
              className={`${classes["userCart_product_lengthUpdate--BTN"]} ${classes["userCart_product_delete--BTN"]}`}
            >
              <span className={classes["dpfc_icon--WRAPPER"]}>
                <Image
                  src="/icons/delete_product.png"
                  width="15"
                  height="15"
                  alt="detele product"
                ></Image>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartProductCard;
