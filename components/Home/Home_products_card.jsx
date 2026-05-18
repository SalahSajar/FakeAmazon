import { Fragment, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { useFetchProductsByCategory } from "@CustomHooks/useFetchProductsByCategory";

import {ShufflingAlgo} from "@Lib/Scripts/ShufflingAlgo";

import classes from "@HomeCompsStyles/Home_products_card.module.scss";

const Home_products_card = ({ title, purpose, categories, keyword, categoryId, link }) => {
  let fetchHandlerBlocker = useRef(false);

  const [product, setProduct] = useState(0);
  const [topProductsRec, setTopProductsRec] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // const topProductsRecommendation__LIST = !!products?.length && products.splice(0, 5);
  // console.log("---------- Top Products Recommendation List");
  // console.log(topProductsRecommendation__LIST);

  const {FetchProductsByCategory} = useFetchProductsByCategory();

  const reloadProductsCard__FUNC = () => {
    setLoading(true);
    setError(false);
    searchProduct__HANDLER();
  };

  const changeProductSelection__FUNC = (productIndex) => setProduct(productIndex);

  const searchProduct__HANDLER = useCallback(async () => {
    //--> PPC = Products per Category
    const {
      error: PPC_is_error,
      loading: PPC_is_loading,
      PPC_List,
    } = await FetchProductsByCategory(categoryId);

    if (!PPC_is_loading && !PPC_is_error && !!PPC_List?.length) {
      const shuffled__PPC__List = ShufflingAlgo(PPC_List);

      setProducts(shuffled__PPC__List);
      setTopProductsRec(shuffled__PPC__List.splice(0, 5));
    }

    setLoading(PPC_is_loading);
    setError(PPC_is_error);
  }, [categoryId, FetchProductsByCategory]);

  useEffect(() => {
    if (!fetchHandlerBlocker.current && !isNaN(+categoryId)) {
      searchProduct__HANDLER();
      fetchHandlerBlocker.current = true;
    }
  }, [searchProduct__HANDLER, categoryId]);

  // useEffect(() => {
  //   async function handleFetchingProductsByCategory() {
  //     const req = await fetch(`/api/amazonProducts/bestOfCategory?categoryId=${categoryId}`);
  //     const res = await req.json();
  //     console.log(res);

  //     // const products = await FetchProductsByCategory(categoryId);
  //     // console.log(`********Products of category: ${categoryId}`)
  //     // console.log(products)

  //   }
  //   if(categoryId){
  //     handleFetchingProductsByCategory();
  //   }
  // }, [categoryId])

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
                <span className={`md_lg_font`}>something went wrong, please try again later</span>
                <button onClick={reloadProductsCard__FUNC} type="button" className={`${classes["card_reload--BTN"]} md_font`}>reload</button>
              </div>
            ) : (
              <Fragment>
                {/* -------------------- PRODUCTS RECOMMENDATIONS CARD ------------- */}
                {purpose === "products recommendation" && (
                  <div className={`${classes["card_links--CONTAINER"]} ${classes["card_multi_links--CONTAINER"]}`}>
                    {!!products?.length &&
                      products.splice(0, 4).map(({ _id, imgUrl, title, asin }) => {
                        return (
                          <Link
                            key={_id}
                            title={title}
                            className={classes["card_main_link--EL"]}
                            href={`/dp?asin=${asin}`} 
                          >
                            <div className={classes["product_infos--CONTAINER"]} >
                              <span className={classes["product_img--WRAPPER"]} >
                                <Image
                                  src={imgUrl}
                                  alt={title}
                                  fill={true}
                                  sizes="100vw"
                                  style={{objectFit:"contain"}}
                                />
                              </span>

                              <h3 className={classes["product_title--EL"]}> {title} </h3>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                )}
                {/* --------------------////////////------------------- */}

                {/* -------------------- TOP PRODUCTS RECOMMENDATIONS CARD ------------- */}
                {purpose === "top products recommendation card" && (
                  <Fragment>
                    <div className={`${classes["card_links--CONTAINER"]} ${classes["top_products_card--CONTAINER"]}`}>
                      <div className={classes["top_products_content--EL"]}>
                        {!!topProductsRec && (
                          <Fragment>
                            <Link href={`/dp?asin=${topProductsRec[product].asin}`} className={classes["selected_product_Link--EL"]}>
                              <div className={ classes[ "selected_products_infos--CONTAINER" ] } >
                                <span className={ classes["selected_product_img--EL"] } >
                                  <Image
                                    src={topProductsRec[product].imgUrl}
                                    alt="product id"
                                    fill={true}
                                    style={{objectFit:"contain"}}
                                  />
                                </span>

                                <h3 title={topProductsRec[product].title} className={`${classes["selected_product_title--EL"]} md_font`}>{topProductsRec[product].title}</h3>

                                {!!topProductsRec[product].price && <span className={`${classes["selected_product_price--EL"]} lg_font`} > ${topProductsRec[product].price} </span>}
                              </div>
                            </Link>

                            <div className={classes["other_products--EL"]}>
                              <ul className={ classes["other_products_list--CONTAINER"] } >
                                {topProductsRec?.length ? topProductsRec.map(({ _id, asin, title, imgUrl }, idx) => {
                                  return (
                                    <li key={_id} className={product === idx ? classes["active_product"] : ""}>
                                      <button type="button" onClick={() => changeProductSelection__FUNC(idx)}>
                                        <div className={classes[ "other_product_img--WRAPPER" ]}>
                                          <Image
                                            src={imgUrl}
                                            alt={title}
                                            fill={true}
                                            style={{objectFit:"contain"}}
                                          />
                                        </div>
                                      </button>
                                    </li>
                                  )
                                }) : <h3>Something Went Wrong</h3>}
                              </ul>
                            </div>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
                {/* ---------------- ////// \\\\\\ ---------------- */}
              </Fragment>
            ))}
          {/* -------------------- MULTIPUL CATEGORIES REDIRECT CARDS -------------------- */}
          {purpose === "multi categories redirection card" && (
            <div className={`${classes["card_links--CONTAINER"]} ${classes["card_multi_links--CONTAINER"]} ${classes["categories_card--CONTAINER"]}`}>
              {categories.map(({ title, href, bg_path }) => {
                return (
                  <Link className={classes["card_main_link--EL"]} key={title} href={href}>
                    <div className={`${classes["card_link_content--CONTAINER"]}`}>
                      <span className={classes["category_img--CONTAINER"]}>
                        <Image
                          src={bg_path}
                          alt={title}
                          fill={true}
                          style={{objectFit:"contain"}}
                        />
                      </span>
                      <h3 className={classes["category_title--CONTAINER"]}>{title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {/* ---------------- /////// \\\\\\\ --------------- */}

          {/* -------------- CATEGORY REDIRECT CARD -------------- */}
          {purpose === "redirection card" && (
            <Fragment>
              <Link className={classes["card_main_link--EL"]} href={link}>
                <Image
                  src={`/home_redirection_links_bg/${title}.jpg`}
                  alt={title}
                  fill={true}
                  style={{objectFit:"cover", objectPosition:"center"}}
                  
                />
              </Link>
            </Fragment>
          )}
          {/* --------------------////////////------------------- */}
        </div>
      </div>

      <Fragment>
        {purpose === "redirection card" || purpose === "multi categories redirection card" ? (
          <div className={classes["card--FOOTER"]}>
            <Link className="md_font" href="/">shop now</Link>
          </div>
        ) : ""}
      </Fragment>
    </article>
  );
};

export default Home_products_card;
