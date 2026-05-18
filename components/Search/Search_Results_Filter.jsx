import React from "react";

import Link from "next/link";

import classes from "@SearchCompsStyles/Search_Results_Filter.module.scss";

const Search_Results_Filter = ({
  filterProductsByStars__HANDLER,
  filterProductsByPrice__HANDLER,
  filterProductsByPriceRange__HANDLER,
  clearFilter__HANDLER,
  filterByStars,
  filterByPrice,
}) => {
  const submitPriceRangeForm__HANDLER = (evt) => {
    evt.preventDefault();

    let minPrice = evt.target.min_price.value;
    let maxPrice = evt.target.max_price.value;

    let priceRange;

    if (!!minPrice || !!maxPrice) {
      filterProductsByPrice__HANDLER("custom");

      priceRange = {
        min: +minPrice,
        max: +maxPrice,
      };

      filterProductsByPriceRange__HANDLER(priceRange);
    }
  };
  return (
    <aside aria-label="Products Filter" className={classes["search_results_filter--BLOCK"]}>
      <div className={classes["search_results_filter_content--WRAPPER"]}>
        <div className={classes["filter_methods--CONTAINER"]}>
          <div className={`${classes["filter_method--BLOCK"]} ${classes["filterBy_customerReviews--BLOCK"]}`}>
            <div className={classes["filter_method_header--EL"]}>
              <h5 className={`${classes["filter_method_title--EL"]} md_lg_font`}>Customer Reviews</h5>

              {!!filterByStars && (
                <Link 
                  className={`${classes["filter_clear--BTN"]} sm_font`}
                  onClick={() => clearFilter__HANDLER("stars")}
                  href="javascript:void(0)">clear</Link>
              )}
            </div>
            <ul className={`${classes["filter_method_options--LIST"]} md_font`}>
              <li className={classes["filter_method_option"]}>
                <Link
                  className={`${filterByStars === "4-up" && classes["active_filter--EL"]}`}
                  onClick={() => filterProductsByStars__HANDLER("4-up")}
                  href="javascript:void(0)"
                >
                  <i className={`${classes["review_stars--ICON"]} ${classes["atleast_4-stars"]}`} ></i>{" "} & up
                </Link>
              </li>
              <li className={classes["filter_method_option"]}>
                <Link 
                  className={`${filterByStars === "3-up" && classes["active_filter--EL"]}`}
                  onClick={() => filterProductsByStars__HANDLER("3-up")}
                  href="javascript:void(0)"
                >
                  <i className={`${classes["review_stars--ICON"]} ${classes["atleast_3-stars"]}`} ></i>{" "}& up
                </Link>
              </li>
              <li className={classes["filter_method_option"]}>
                <Link
                  className={`${filterByStars === "2-up" && classes["active_filter--EL"]}`}
                  onClick={() => filterProductsByStars__HANDLER("2-up")}
                  href="javascript:void(0)"
                >
                    <i className={`${classes["review_stars--ICON"]} ${classes["atleast_2-stars"]}`} ></i>{" "} & up
                </Link>
              </li>
              <li className={classes["filter_method_option"]}>
                <Link 
                  className={`${filterByStars === "1-up" && classes["active_filter--EL"]}`}
                  onClick={() => filterProductsByStars__HANDLER("1-up")}
                  href="javascript:void(0)">
                    <i className={`${classes["review_stars--ICON"]} ${classes["atleast_1-star"]}`} ></i>{" "} & up
                </Link>
              </li>
            </ul>
          </div>

          <div className={`${classes["filter_method--BLOCK"]} ${classes["filterBy_priceRange--BLOCK"]}`} >
            <div className={classes["filter_method_header--EL"]}>
              <h5 className={`${classes["filter_method_title--EL"]} md_lg_font`} > price </h5>

              {!!filterByPrice && (
                <Link 
                  className={`${classes["filter_clear--BTN"]} sm_font`}
                  onClick={() => clearFilter__HANDLER("price")}
                  href="javascript:void(0)"
                >clear</Link>
              )}
            </div>
            <ul className={`${classes["filter_method_options--LIST"]} md_font`}>
              <li className={classes["filter_method_option"]}>
                <Link 
                  onClick={() => filterProductsByPrice__HANDLER("under-25")}
                  className={filterByPrice === "under-25" &&classes["active_filter--EL"]}
                  href="javascript:void(0)"
                >Under $25</Link>
              </li>
              <li className={classes["filter_method_option"]}>
                <Link 
                  onClick={() => filterProductsByPrice__HANDLER("25->50")}
                  className={filterByPrice === "25->50" && classes["active_filter--EL"]}
                  href="javascript:void(0)">$25 to $50</Link>
              </li>
              <li className={classes["filter_method_option"]}>
                <Link 
                  onClick={() => filterProductsByPrice__HANDLER("50->100")}
                  className={filterByPrice === "50->100" &&classes["active_filter--EL"]}
                  href="javascript:void(0)">$50 to $100</Link>
              </li>
              <li className={classes["filter_method_option"]}>
                <Link 
                  onClick={() => filterProductsByPrice__HANDLER("100->200")}
                  className={filterByPrice === "100->200" &&classes["active_filter--EL"]}
                  href="javascript:void(0)">$100 to $200</Link>
              </li>
              <li className={classes["filter_method_option"]}>
                <Link 
                  onClick={() => filterProductsByPrice__HANDLER("over-200")}
                  className={filterByPrice === "over-200" &&classes["active_filter--EL"]}
                  href="javascript:void(0)">$200 & Above</Link>
              </li>
              <li className={classes["price_filter_method_form--CONTAINER"]}>
                <form
                  onSubmit={submitPriceRangeForm__HANDLER}
                  id="price_filter_method--FORM"
                  className={`${classes["price_filter_method--FORM"]}`}
                >
                  <div className={`${classes["price_filter--BLOCK"]} ${classes["min_price--BLOCK"]}`} data-currency="$" >
                    <input
                      className="md_font"
                      type="number"
                      placeholder="Min"
                      name="min_price"
                      id="min_price"
                    />
                  </div>

                  <div className={`${classes["price_filter--BLOCK"]} ${classes["max_price--BLOCK"]}`} data-currency="$" >
                    <input
                      className="md_font"
                      type="number"
                      placeholder="Max"
                      name="max_price"
                      id="max_price"
                    />
                  </div>
                  <button type="submit" className={`${classes["price_filter_submit--BTN"]} md_font`} > Go </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Search_Results_Filter;
