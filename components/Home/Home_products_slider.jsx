import React, {Fragment, useEffect, useState, useCallback, useRef} from "react";
import Link from "next/link";
import Image from "next/image";

import { useFetchProductsByCategory } from "@CustomHooks/useFetchProductsByCategory";

import { useProductSearchFetch } from "@CustomHooks/useProductSearchFetch";
import { useProductAsinFinder } from "@CustomHooks/useProductAsinFinder";

import {ShufflingAlgo} from "@Lib/Scripts/ShufflingAlgo";

import classes from "@HomeCompsStyles/Home_products_slider.module.scss";

const Home_products_slider = ({ title, keyword, categoryId }) => {
  let fetchHandlerBlocker = useRef(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {FetchProductsByCategory} = useFetchProductsByCategory();

  const reloadProductsCard__FUNC = () => {
    setLoading(true);
    setError(false);

    searchProduct__HANDLER();
  };

  const searchProduct__HANDLER = useCallback(async () => {
    const {
      error: PPC_is_error,
      loading: PPC_is_loading,
      PPC_List
    } = await FetchProductsByCategory(categoryId);

    if (!PPC_is_error && !!PPC_List?.length && !PPC_is_loading) setProducts(ShufflingAlgo(PPC_List));

    setLoading(PPC_is_loading);
    setError(PPC_is_error);
  }, [keyword, FetchProductsByCategory]);

  useEffect(() => {
    if (!fetchHandlerBlocker.current && !!keyword) {
      searchProduct__HANDLER();

      fetchHandlerBlocker.current = true;
    }
  }, [searchProduct__HANDLER, keyword]);

  return (
    <Fragment>
      <article className={classes["products--SLIDER"]}>
        <div className={classes["products_content--CONTAINER"]}>
          <h2 className={`${classes["proucts_slider_title--EL"]} lg_font`}>{title}</h2>

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
                      width={50}
                      height={50}
                      alt="error fetching products"
                    />
                  </div>
                  <span className={`md_lg_font`}>something went wrong, please try again later</span>

                  <button onClick={reloadProductsCard__FUNC} type="button" className={`${classes["card_reload--BTN"]} md_font`}>reload</button>
                </div>
              ) : (
                <Fragment>
                  {!!products?.length && products?.map(({ _id, asin, title, imgUrl }) => {
                      return (
                        <li key={_id}>
                          <Link
                            title={title}
                            className={classes["product_item--EL"]}
                            href={`/dp?asin=${asin}`}
                          >
                            <Image
                              src={imgUrl}
                              alt={title}
                              width={10}
                              height={10}
                              sizes="100vw"
                              style={{width: "fit-content", height: "100%", objectFit:"contain"}}
                            />
                          </Link>
                        </li>
                      );
                    })}
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </article>
    </Fragment>
  );
};

export default Home_products_slider;
