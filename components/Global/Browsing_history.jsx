import { Fragment } from "react";

import classes from "../../styles/Components/Global/Browsing_history.module.scss";

const Browsing_history = () => {
  return (
    <Fragment>
      <div className={classes["products_browsingHistory--EL"]}>
        <div className={classes["products_browsingHistory_content--CONTAINER"]}>
          <div
            className={classes["products_browsingHistory_header--CONTAINER"]}
          >
            <h4>Your Browsing History</h4>
            {/* <span className={classes["products_page--EL"]}>Page 1 of 8</span> */}
          </div>
          <div
            className={classes["browsing_histosy_feature_IsUnavailable--BLOCK"]}
          >
            <span
              className={`${classes["browsing_histosy_feature_IsUnavailable--TYPO"]} lg_font`}
            >
              browsing history feature is currently unavailable.
            </span>
          </div>
          {/* <div className={classes["products_carousel--CONTAINER"]}>
            <span
              className={`${classes["products_carousel_btn--CONTAINER"]} ${classes["left_carousel--CONTAINER"]}`}
            >
              <Link href="/">
                <a className={classes["left_carousel--BTN"]}>
                  <img src="/icons/arrow-left.png" alt="backwards products" />
                </a>
              </Link>
            </span>

            <div className={classes["products--CONTAINER"]}>
              <div className={classes["product_infos--EL"]}>
                <div className={classes["product_infos_content--CONTAINER"]}>
                  <Link href="/">
                    <a>
                      <span className={classes["product_img--CONTAINER"]}>
                        <img src="/products_bgs2/product.jpg" alt="" />
                      </span>
                      <span className={classes["product_title--CONTAINER"]}>
                        Backpack for Men and Women,School Backpack for
                        Teens,15.6 inch Laptop Backpack with USB Charging port
                        for Business College Travel
                      </span>
                    </a>
                  </Link>

                  <Link href="/product/reviews">
                    <a
                      className={classes["product_reviews_link--EL"]}
                      title="somtijinh"
                    >
                      <div
                        className={classes["product_reviews_stars--CONTAINER"]}
                      >
                        <span
                          className={`${classes["star--EL"]} ${classes["fullStar"]}`}
                        ></span>
                        <span
                          className={`${classes["star--EL"]} ${classes["fullStar"]}`}
                        ></span>
                        <span
                          className={`${classes["star--EL"]} ${classes["halfStar"]}`}
                        ></span>
                        <span
                          className={`${classes["star--EL"]} ${classes["emptyStar"]}`}
                        ></span>
                        <span
                          className={`${classes["star--EL"]} ${classes["emptyStar"]}`}
                        ></span>
                      </div>
                      <span>21,235</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className={`${classes["product_ranking--EL"]}`}>
                      <mark className={classes["N1_ranking--EL"]}>
                        #1 best seller
                      </mark>{" "}
                      in computer cases
                    </a>
                  </Link>

                  <Link href="/">
                    <a className={classes["product_price--EL"]}>$39.99</a>
                  </Link>

                  <span className={classes["product_shipping_fee--EL"]}>
                    $57.54 shipping
                  </span>
                </div>
              </div>
            </div>

            <span
              className={`${classes["products_carousel_btn--CONTAINER"]} ${classes["right_carousel--CONTAINER"]}`}
            >
              <Link href="/">
                <a className={classes["left_carousel--BTN"]}>
                  <img src="/icons/arrow-right.png" alt="forwards products" />
                </a>
              </Link>
            </span>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Browsing_history;
