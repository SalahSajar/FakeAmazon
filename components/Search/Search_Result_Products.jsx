import React, { Fragment } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

import Search_Result_Product_Card from "./Search_Result_Product_Card";
import Products_Advertisement_Slider from "./Products_Advertisement_Slider";

import classes from "../../styles/Components/Search/Search_Result_Products.module.scss";

const Search_Result_Products = ({ ads, products, error }) => {
  const router = useRouter();

  return (
    <article className={classes["search_result--BLOCK"]}>
      <div
        className={`${classes["search_result_products--HEADER"]} md_lg_font`}
      >
        <h2>results</h2>
      </div>

      <div className={classes["search_result_products--BLOCK"]}>
        <div className={classes["search_result_products--CONTAINER"]}>
          {error ? (
            <Fragment>
              <Head>
                <title>Amazon | Something Went Wrong, Please Try Again</title>
              </Head>
              <div className={classes["search_result_error--BLOCK"]}>
                <div
                  className={classes["search_result_error_content--WRAPPER"]}
                >
                  <span className={`md_lg_font`}>
                    Something Went Wrong!! Please try again Later.
                  </span>
                  <button
                    onClick={() => router.reload()}
                    className={`${classes["page_reload--BTN"]} md_font`}
                  >
                    reload
                  </button>
                </div>
              </div>
            </Fragment>
          ) : !!products.length ? (
            <Fragment>
              <Head>
                <title>Amazon | Search for: {router.query.k}</title>
              </Head>

              {products.map((productDetails, idx) => {
                return (
                  <Fragment key={idx}>
                    <Search_Result_Product_Card
                      productDetails={productDetails}
                    />
                  </Fragment>
                );
              })}

              {!!ads && !!ads?.length ? (
                <Products_Advertisement_Slider ads={ads} />
              ) : (
                ""
              )}
            </Fragment>
          ) : (
            <Fragment>
              <Head>
                <title>Amazon | Products Not Found</title>
              </Head>
              <div className={classes["search_result_error--BLOCK"]}>
                <div
                  className={classes["search_result_error_content--WRAPPER"]}
                >
                  <h4>no products found</h4>
                  <button
                    onClick={() => router.reload()}
                    className={classes["page_reload--BTN"]}
                  >
                    reload
                  </button>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </article>
  );
};

export default Search_Result_Products;
