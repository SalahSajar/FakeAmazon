import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useProductAsinFinder } from "../../customHooks/useProductAsinFinder";

import classes from "../../styles/Components/Search/Search_Results_Card.module.scss";

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

  const { findProductAsin__HANDLER } = useProductAsinFinder();
  const productASIN = findProductAsin__HANDLER(productDetails.url);

  return (
    <div className={classes["search_result_product--CARD"]}>
      <div className={classes["search_result_product_content--WRAPPER"]}>
        <Link href={`/dp?asin=${productASIN}&k=${router.query.k}`}>
          <a className={classes["search_result_product--IMG"]}>
            <span className={classes["search_result_product_img--CONTAINER"]}>
              <Image
                src={productDetails.image}
                layout="fill"
                priority="lazy"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64`}
                objectFit="contain"
                objectPosition="center"
                alt={productDetails.name}
              />
            </span>
            {productDetails.is_amazon_choice && (
              <div
                className={`${classes["search_result_product_badge--EL"]} sm_font ${classes["amazon_choice_badge"]}`}
              >
                <div
                  className={
                    classes["search_result_product_badge_content--WRAPPER"]
                  }
                >
                  <span
                    className={classes["search_result_product_badge_--TEXT"]}
                  >
                    amazon&#39;s{" "}
                    <span className={classes["orange_colored--EL"]}>
                      choice
                    </span>
                  </span>
                </div>
              </div>
            )}

            {productDetails.is_best_seller && (
              <div
                className={`${classes["search_result_product_badge--EL"]} sm_font ${classes["best_seller_badge"]}`}
              >
                <div
                  className={
                    classes["search_result_product_badge_content--WRAPPER"]
                  }
                >
                  <span
                    className={classes["search_result_product_badge_--TEXT"]}
                  >
                    best seller
                  </span>
                </div>
              </div>
            )}
          </a>
        </Link>
        <div className={classes["search_result_product_infos--CONTAINER"]}>
          <Link href={`/dp?asin=${productASIN}&k=${router.query.k}`}>
            <a
              title={productDetails.name}
              className={`${classes["search_result_product_title--EL"]} md_font`}
            >
              {productDetails.name}
            </a>
          </Link>
          {productDetails.stars && productDetails.total_reviews ? (
            <div
              className={`${classes["search_result_product_reviews--BLOCK"]} sm_font`}
            >
              <i
                title={`${productDetails.stars}/5`}
                data-review_stars={product_review_stars__FUNC(
                  productDetails.stars
                )}
                className={classes["product_reviews--ICON"]}
              ></i>
              {" - "}
              <span>{productDetails.total_reviews}</span>
            </div>
          ) : (
            ""
          )}
          {!!productDetails.price && (
            <Link href={`/dp?asin=${productASIN}&k=${router.query.k}`}>
              <a className={classes["search_result_product_price--BLOCK"]}>
                <div
                  className={
                    classes["search_result_product_current_price--WRAPPER"]
                  }
                >
                  <span
                    className={`${classes["secondary_price_detail--EL"]} sm_font`}
                  >
                    $
                  </span>
                  <span
                    className={`${classes["main_price_detail--EL"]} xlg_font`}
                  >
                    {Math.floor(productDetails.price)}
                  </span>
                  <span
                    className={`${classes["secondary_price_detail--EL"]} sm_font`}
                  >
                    {String(productDetails.price).includes(".")
                      ? String(productDetails.price).slice(
                          String(productDetails.price).indexOf(".") + 1,
                          String(productDetails.price).length
                        )
                      : "00"}
                  </span>
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search_Result_Product_Card;
