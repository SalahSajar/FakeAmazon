import { Fragment, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { useProductSearchFetch } from "../../customHooks/useProductSearchFetch";
import { useProductAsinFinder } from "../../customHooks/useProductAsinFinder";

import classes from "../../styles/Components/Home/Home_products_card.module.scss";

const Home_products_card = ({ title, purpose, categories, keyword, link }) => {
  let fetchHandlerBlocker = useRef(false);

  const [product, setProduct] = useState(0);
  const [randomProducts, setRandomProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { productSearchFetch__HANDLER } = useProductSearchFetch();
  const { findProductAsin__HANDLER } = useProductAsinFinder();

  const selectRandomFourItems__FUNC = (items) => {
    const randomFourItemsData = [];
    let randomItemsIndex = [];

    while (randomItemsIndex.length !== 4) {
      const randomIndex = Math.floor(Math.random() * items.length);

      if (!randomItemsIndex.includes(randomIndex)) {
        randomItemsIndex.push(randomIndex);
        randomFourItemsData.push(items[randomIndex]);
      }
    }

    setRandomProducts(randomFourItemsData);
  };

  const reloadProductsCard__FUNC = () => {
    setLoading(true);
    setError(false);
    searchProduct__HANDLER();
  };

  const changeProductSelection__FUNC = (productIndex) => {
    setProduct(productIndex);
  };

  const searchProduct__HANDLER = useCallback(async () => {
    const {
      error: productSearchError,
      loading: productSearchLoading,
      productSearchResult,
    } = await productSearchFetch__HANDLER(keyword);

    if (
      !productSearchLoading &&
      !!productSearchResult?.length &&
      !productSearchError
    ) {
      selectRandomFourItems__FUNC(productSearchResult);
    }

    setProducts(productSearchResult);
    setLoading(productSearchLoading);
    setError(productSearchError);
  }, [keyword, productSearchFetch__HANDLER]);

  useEffect(() => {
    if (!fetchHandlerBlocker.current && !!keyword) {
      searchProduct__HANDLER();
      fetchHandlerBlocker.current = true;
    }
  }, [searchProduct__HANDLER, keyword]);

  return (
    <article className={classes["products--CARD"]}>
      <div className={`${classes["card--HEADER"]}`}>
        <h2 className="lg_font">{title}</h2>
      </div>
      <div className={classes["card--BODY"]}>
        <div className={classes["card_body_content--CONTAINER"]}>
          {purpose !== "multi categories redirection card" &&
            purpose !== "redirection card" &&
            (loading ? (
              <div className={classes["loading_gif--CONTAINER"]}>
                <Image
                  className={classes["loading_img--EL"]}
                  src="/icons/loading.gif"
                  width={50}
                  height={50}
                  alt="loading"
                />
              </div>
            ) : error ? (
              <div className={classes["products_error--BLOCK"]}>
                <div className={classes["error_icon--CONTAINER"]}>
                  <Image
                    src="/icons/error-48.png"
                    width="50"
                    height="50"
                    alt="error fetching products"
                  />
                </div>
                <span className={`md_lg_font`}>
                  something went wrong, please try again later
                </span>
                <button
                  onClick={reloadProductsCard__FUNC}
                  type="button"
                  className={`${classes["card_reload--BTN"]} md_font`}
                >
                  reload
                </button>
              </div>
            ) : (
              <Fragment>
                {/* -------------------- PRODUCTS RECOMMENDATIONS CARD ------------- */}
                {purpose === "products recommendation" && (
                  <div
                    className={`${classes["card_links--CONTAINER"]} ${classes["card_multi_links--CONTAINER"]}`}
                  >
                    {!!randomProducts &&
                      randomProducts.map(({ image, name, url }) => {
                        return (
                          <Link
                            key={findProductAsin__HANDLER(url)}
                            href={`/dp?asin=${findProductAsin__HANDLER(url)}`}
                          >
                            <a
                              title={name}
                              className={classes["card_main_link--EL"]}
                            >
                              <div
                                className={classes["product_infos--CONTAINER"]}
                              >
                                <span
                                  className={classes["product_img--WRAPPER"]}
                                >
                                  <Image
                                    src={image}
                                    alt={name}
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </span>
                                <h3 className={classes["product_title--EL"]}>
                                  {name}
                                </h3>
                              </div>
                            </a>
                          </Link>
                        );
                      })}
                  </div>
                )}
                {/* --------------------////////////------------------- */}

                {/* -------------------- TOP PRODUCTS RECOMMENDATIONS CARD ------------- */}
                {purpose === "top products recommendation card" && (
                  <Fragment>
                    <div
                      className={`${classes["card_links--CONTAINER"]} ${classes["top_products_card--CONTAINER"]}`}
                    >
                      <div className={classes["top_products_content--EL"]}>
                        {!!randomProducts && (
                          <Fragment>
                            <Link
                              href={`/dp?asin=${findProductAsin__HANDLER(
                                randomProducts[product].url
                              )}`}
                            >
                              <a
                                className={classes["selected_product_Link--EL"]}
                              >
                                <div
                                  className={
                                    classes[
                                      "selected_products_infos--CONTAINER"
                                    ]
                                  }
                                >
                                  <span
                                    className={
                                      classes["selected_product_img--EL"]
                                    }
                                  >
                                    <Image
                                      src={randomProducts[product].image}
                                      alt="product id"
                                      layout="fill"
                                      objectFit="contain"
                                    />
                                  </span>
                                  <h3
                                    title={randomProducts[product].name}
                                    className={`${classes["selected_product_title--EL"]} md_font`}
                                  >
                                    {randomProducts[product].name}
                                  </h3>
                                  {!!randomProducts[product].price && (
                                    <span
                                      className={`${classes["selected_product_price--EL"]} lg_font`}
                                    >
                                      ${randomProducts[product].price}
                                    </span>
                                  )}
                                </div>
                              </a>
                            </Link>

                            <div className={classes["other_products--EL"]}>
                              <ul
                                className={
                                  classes["other_products_list--CONTAINER"]
                                }
                              >
                                {!!products?.length && randomProducts ? (
                                  randomProducts.map(
                                    ({ url, image }, index) => {
                                      return (
                                        <li
                                          key={findProductAsin__HANDLER(url)}
                                          className={
                                            product === index
                                              ? classes["active_product"]
                                              : ""
                                          }
                                        >
                                          <button
                                            type="button"
                                            onClick={() =>
                                              changeProductSelection__FUNC(
                                                index
                                              )
                                            }
                                          >
                                            <div
                                              className={
                                                classes[
                                                  "other_product_img--WRAPPER"
                                                ]
                                              }
                                            >
                                              <Image
                                                src={image}
                                                alt={"id"}
                                                layout="fill"
                                                objectFit="contain"
                                              />
                                            </div>
                                          </button>
                                        </li>
                                      );
                                    }
                                  )
                                ) : (
                                  <h3>Something Went Wrong</h3>
                                )}
                              </ul>
                            </div>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
                {/* --------------------////////////------------------- */}
              </Fragment>
            ))}
          {/* -------------------- MULTIPUL CATEGORIES REDIRECT CARDS------------- */}
          {purpose === "multi categories redirection card" && (
            <div
              className={`${classes["card_links--CONTAINER"]} ${classes["card_multi_links--CONTAINER"]} ${classes["categories_card--CONTAINER"]}`}
            >
              {categories.map(({ title, href, bg_path }) => {
                return (
                  <Link key={title} href={href}>
                    <a className={classes["card_main_link--EL"]}>
                      <div
                        className={`${classes["card_link_content--CONTAINER"]}`}
                      >
                        <span className={classes["category_img--CONTAINER"]}>
                          <Image
                            src={bg_path}
                            alt={title}
                            layout="fill"
                            objectFit="contain"
                          />
                        </span>
                        <h3 className={classes["category_title--CONTAINER"]}>
                          {title}
                        </h3>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          )}
          {/* --------------------////////////------------------- */}

          {/* --------------------CATEGORY REDIRECT CARD------------- */}
          {purpose === "redirection card" && (
            <Fragment>
              <Link href={link}>
                <a className={classes["card_main_link--EL"]}>
                  <Image
                    src={`/home_redirection_links_bg/${title}.jpg`}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </a>
              </Link>
            </Fragment>
          )}
          {/* --------------------////////////------------------- */}
        </div>
      </div>

      <Fragment>
        {purpose === "redirection card" ||
        purpose === "multi categories redirection card" ? (
          <div className={classes["card--FOOTER"]}>
            <Link href="/">
              <a className="md_font">shop now</a>
            </Link>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    </article>
  );
};

export default Home_products_card;
