'use client'

import { useRouter, useEffect } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useProductAsinFinder } from "@CustomHooks/useProductAsinFinder";

import classes from "@SearchCompsStyles/Search_Results_Card.module.scss";

const product_review_stars__FUNC = (product_review) => {
  let finalResult;
  const reviewRest = product_review % 1;

  if (reviewRest === 0) {
    finalResult = product_review;
  } else {
    if (product_review % 0.5 === 0) {
      finalResult = product_review;
    } else {
      if (reviewRest >= 0.25 && reviewRest <= 0.75)
        finalResult = Math.floor(product_review) + 0.5;
      if (reviewRest < 0.25) finalResult = Math.floor(product_review);
      if (reviewRest > 0.75) finalResult = Math.ceil(product_review);
    }
  }

  return finalResult;
};

const Search_Result_Product_Card = ({ productDetails }) => {
  const router = useRouter();

  // const { findProductAsin__HANDLER } = useProductAsinFinder();
  // const productASIN = findProductAsin__HANDLER(productDetails.url);

  console.log("*** product Details Object")
  console.log(productDetails)

  return (
    <article className={classes["search_result_product--CARD"]}>
      <div className={classes["search_result_product_content--WRAPPER"]}>
        <Link className={classes["search_result_product--IMG"]} href={`/dp?asin=${productDetails.asin}&k=${router.query.k}`}>
          <span className={classes["search_result_product_img--CONTAINER"]}>
            <Image
              src={productDetails.thumbnail}
              fill={true}
              sizes="auto"
              style={{objectFit:"contain", objectPosition:"center"}}
              loading="lazy"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64`}
              alt={productDetails.title}
            />
          </span>
          {productDetails.is_amazon_choice && (
            <div className={`${classes["search_result_product_badge--EL"]} sm_font ${classes["amazon_choice_badge"]}`} >
              <div className={ classes["search_result_product_badge_content--WRAPPER"] } >
                <span className={classes["search_result_product_badge_--TEXT"]} >
                  amazon&#39;s{" "}
                  <span className={classes["orange_colored--EL"]}> choice </span>
                </span>
              </div>
            </div>
          )}

          {productDetails.is_best_seller && (
            <div className={`${classes["search_result_product_badge--EL"]} sm_font ${classes["best_seller_badge"]}`} >
              <div className={ classes["search_result_product_badge_content--WRAPPER"] } >
                <span className={classes["search_result_product_badge_--TEXT"]} > best seller </span>
              </div>
            </div>
          )}
        </Link>
        <div className={classes["search_result_product_infos--CONTAINER"]}>
          <h3>
            <Link 
              title={productDetails.title}
              className={`${classes["search_result_product_title--EL"]} md_font`} 
              href={`/dp?asin=${productDetails.asin}&k=${router.query.k}`}> {productDetails.title} </Link>
          </h3>
          {productDetails.rating && productDetails.reviews ? (
            <div className={`${classes["search_result_product_reviews--BLOCK"]} sm_font`} >
              <i
                title={`${productDetails.rating}/5`}
                data-review_stars={product_review_stars__FUNC( productDetails.rating )}
                className={classes["product_reviews--ICON"]}
              ></i>
              {" - "}
              <span>{productDetails.reviews}</span>
            </div>
          ) : (
            ""
          )}
          {!!productDetails.extracted_price && (
            <Link className={classes["search_result_product_price--BLOCK"]} href={`/dp?asin=${productDetails.asin}&k=${router.query.k}`}>
              <div className={ classes["search_result_product_current_price--WRAPPER"] } >
                <span className={`${classes["secondary_price_detail--EL"]} sm_font`} > $ </span>
                <span className={`${classes["main_price_detail--EL"]} xlg_font`} > {Math.floor(productDetails.extracted_price)} </span>
                <span className={`${classes["secondary_price_detail--EL"]} sm_font`} >
                  {String(productDetails.extracted_price).includes(".") ? String(productDetails.extracted_price).slice(String(productDetails.extracted_price).indexOf(".") + 1,String(productDetails.extracted_price).length) : "00"}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default Search_Result_Product_Card;
