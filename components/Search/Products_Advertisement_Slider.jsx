import { useEffect } from "react";

import Search_Result_Product_Card from "./Search_Result_Product_Card";

import classes from "../../styles/Components/Search/Products_Advertisement_Slider.module.scss";

const Products_Advertisement_Slider = ({ ads }) => {
  const sponsored_products_navigation__HANDLER = (direction) => {
    const sponsored_products_slider__EL = document.querySelector(
      `.${classes["sponsored_products_block_slider_content--WRAPPER"]}`
    );

    const sponsored_products_slider_scrollLeft =
      sponsored_products_slider__EL.scrollLeft;

    const sponsored_products_slider_scrollWidth =
      sponsored_products_slider__EL.scrollWidth;

    const sponsored_products_slider_width =
      sponsored_products_slider__EL.offsetWidth;

    if (direction === "forwards") {
      if (
        sponsored_products_slider_width +
          sponsored_products_slider_scrollLeft !==
        sponsored_products_slider_scrollWidth
      ) {
        sponsored_products_slider__EL.scroll({
          top: 0,
          left: Math.abs(
            sponsored_products_slider_width +
              sponsored_products_slider_scrollLeft
          ),
          behavior: "smooth",
        });
      }
    }

    if (direction === "backwards") {
      if (sponsored_products_slider_scrollLeft !== 0) {
        sponsored_products_slider__EL.scroll({
          top: 0,
          left:
            sponsored_products_slider_scrollLeft -
            sponsored_products_slider_width,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const sponsored_products_slider__EL = document.querySelector(
      `.${classes["sponsored_products_block_slider_content--WRAPPER"]}`
    );
    const sponsored_products_slider_left__BTN = document.querySelector(
      `.${classes["sponsored_products_left_nav--BTN"]}`
    );
    const sponsored_products_slider_right__BTN = document.querySelector(
      `.${classes["sponsored_products_right_nav--BTN"]}`
    );

    sponsored_products_slider__EL.addEventListener("scroll", (evt) => {
      // Slider scroll details
      const sponsored_products_slider_scrollLeft =
        sponsored_products_slider__EL.scrollLeft;

      const sponsored_products_slider_scrollWidth =
        sponsored_products_slider__EL.scrollWidth;

      const sponsored_products_slider_width =
        sponsored_products_slider__EL.offsetWidth;
      // ----------------------

      if (sponsored_products_slider_scrollLeft === 0) {
        sponsored_products_slider_left__BTN.classList.add(
          classes["hide_navigation_btn"]
        );
      } else {
        sponsored_products_slider_left__BTN.classList.remove(
          classes["hide_navigation_btn"]
        );
      }

      if (
        sponsored_products_slider_scrollLeft +
          sponsored_products_slider_width ===
        sponsored_products_slider_scrollWidth
      ) {
        sponsored_products_slider_right__BTN.classList.add(
          classes["hide_navigation_btn"]
        );
      } else {
        sponsored_products_slider_right__BTN.classList.remove(
          classes["hide_navigation_btn"]
        );
      }
    });
  }, []);

  useEffect(() => {
    const sponsored_products_slider__EL = document.querySelector(
      `.${classes["sponsored_products_block_slider_content--WRAPPER"]}`
    );
    const sponsored_products_slider_left__BTN = document.querySelector(
      `.${classes["sponsored_products_left_nav--BTN"]}`
    );
    const sponsored_products_slider_right__BTN = document.querySelector(
      `.${classes["sponsored_products_right_nav--BTN"]}`
    );

    const sponsored_products_slider_scrollWidth =
      sponsored_products_slider__EL.scrollWidth;

    const sponsored_products_slider_width =
      sponsored_products_slider__EL.offsetWidth;

    if (
      sponsored_products_slider_scrollWidth === sponsored_products_slider_width
    ) {
      sponsored_products_slider_left__BTN.classList.add(
        classes["hide_navigation_btn"]
      );
      sponsored_products_slider_right__BTN.classList.add(
        classes["hide_navigation_btn"]
      );
    }
  }, []);

  return (
    <div className={classes["sponsored_products--BLOCK"]}>
      <div className={classes["sponsored_products_block_content--CONTAINER"]}>
        <div
          className={`${classes["sponsored_products_block--HEADER"]}`}
        >
          <h3 className="lg_font">highly rated</h3>
          <span className="md_font">
            Sponsored | Based on star rating and number of customer ratings
          </span>
        </div>
        <div className={classes["sponsored_products_block--SLIDER"]}>
          <button
            type="button"
            onClick={() => sponsored_products_navigation__HANDLER("backwards")}
            className={`${classes["sponsored_products_navigation--BTN"]} ${classes["sponsored_products_left_nav--BTN"]} ${classes["hide_navigation_btn"]}`}
          >
            <i className={classes["sponsored_products_nav--ICON"]}></i>
          </button>

          <div
            className={
              classes["sponsored_products_block_slider_content--WRAPPER"]
            }
          >
            <div className={classes["sponsored_products--CONTAINER"]}>
              {ads.map((sponsoredProduct, idx) => (
                <Search_Result_Product_Card
                  key={idx}
                  productDetails={sponsoredProduct}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => sponsored_products_navigation__HANDLER("forwards")}
            className={`${classes["sponsored_products_navigation--BTN"]} ${classes["sponsored_products_right_nav--BTN"]}`}
          >
            <i className={classes["sponsored_products_nav--ICON"]}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products_Advertisement_Slider;
