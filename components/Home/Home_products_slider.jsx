import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Link from "next/link";
import Image from "next/image";

import { useProductSearchFetch } from "../../customHooks/useProductSearchFetch";
import { useProductAsinFinder } from "../../customHooks/useProductAsinFinder";

import classes from "../../styles/Components/Home/Home_products_slider.module.scss";

const Home_products_slider = ({ title, keyword }) => {
  let fetchHandlerBlocker = useRef(false);

  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { productSearchFetch__HANDLER } = useProductSearchFetch();
  const { findProductAsin__HANDLER } = useProductAsinFinder();

  const selectRandomTenItems__FUNC = (items) => {
    const randomTenItemsData = [];
    let randomItemsIndex = [];

    if (!items.length) {
      return;
    }

    if (items.length > 10) {
      while (randomItemsIndex.length !== 10) {
        const randomIndex = Math.floor(Math.random() * items.length);
        if (!randomItemsIndex.includes(randomIndex)) {
          randomItemsIndex.push(randomIndex);
          randomTenItemsData.push(items[randomIndex]);
        }
      }

      setRandomProducts(randomTenItemsData);

      return;
    }

    if (items.length <= 10) {
      setRandomProducts(items);

      return;
    }
  };

  const reloadProductsCard__FUNC = () => {
    setLoading(true);
    setError(false);
    searchProduct__HANDLER();
  };

  const searchProduct__HANDLER = useCallback(async () => {
    const {
      error: productSearchError,
      loading: productSearchLoading,
      productSearchResult,
    } = await productSearchFetch__HANDLER(keyword);

    if (
      !productSearchError &&
      !!productSearchResult?.length &&
      !productSearchLoading
    ) {
      selectRandomTenItems__FUNC(productSearchResult);
    }

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
    <Fragment>
      <div className={classes["products--SLIDER"]}>
        <div className={classes["products_content--CONTAINER"]}>
          <span className={classes["proucts_slider_title--EL"]}>{title}</span>

          <div className={classes["products_slider--EL"]}>
            <ul className={classes["products_slider_list--CONTAINER"]}>
              {loading ? (
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
                  {randomProducts.length &&
                    randomProducts.map(({ name, image, url }) => {
                      return (
                        <li key={findProductAsin__HANDLER(url)}>
                          <Link
                            href={`/dp?asin=${findProductAsin__HANDLER(url)}`}
                          >
                            <a
                              title={name}
                              className={classes["product_item--EL"]}
                            >
                              <Image
                                src={image}
                                alt={name}
                                layout="fill"
                                objectFit="contain"
                              />
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home_products_slider;
