import { useState, useContext, useEffect, Fragment } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { UserCartContext } from "@CustomContext/CartCtx";

import Page_layout from "@LayoutComps/Page_layout";

import Navbar from "@GlobalComps/Navbar";
import ProductPrice from "@SearchComps/Product_Price";
import Footer from "@GlobalComps/Footer";

import Main_layout from "@LayoutComps/Main_layout";

import classes from "@PagesStyles/Dp.module.scss";

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

const Dp = ({ product, error }) => {
  const productStyles = product?.customization_options;

  const [selectedProductImageIdx, setSelectedProductImageIdx] = useState(0);
  const [productInformationTable_collapsed, setProductInformationTable_collapsed] = useState(false);

  const {updateUserCart__HANDLER} = useContext(UserCartContext);

  const router = useRouter();

  const addProductToCart__HANDLER = () => {
    const {asin} = router.query;
    const ProductName = product.name;
    const productPrice = parseFloat(product.pricing.replace(/[$,]/g, ""));
    const ProductImg = product.images[0];

    updateUserCart__HANDLER(
      {
        asin,
        name: ProductName,
        price: +productPrice.toFixed(2),
        img: ProductImg,
        amount: 1,
      },
      "add"
    );
  };

  return (
    <Fragment>
      <Page_layout>
        <Navbar />

        {error ? (
          <Fragment>
            <Head>
              <title>Amazon | Something Went Wrong</title>
            </Head>

            <div className={classes["product_error--BLOCK"]}>
              <div className={classes["product_error_content--WRAPPER"]}>
                <h3 className={`lg_font`}>Error: something went wrong, please try again later.</h3>
                <button onClick={() => router.reload()} type="button" className={`${classes["page_reload--BTN"]} md_font`}>reload</button>
              </div>
            </div>
          </Fragment>
        ) : !!product.statusCode ? (
          <Fragment>
            <Head>
              <title>Amazon | Product Not Found</title>
            </Head>

            <div className={classes["product_error--BLOCK"]}>
              <div className={classes["product_error_content--WRAPPER"]}>
                <h3 className={`lg_font`}>Error: Product not found.</h3>
                <button onClick={() => router.reload()} type="button" className={`${classes["page_reload--BTN"]} md_font`}>reload</button>
              </div>
            </div>
          </Fragment>
        ) : !product.name ? (
          <Fragment>
            <Head>
              <title>Amazon | Not Available yet</title>
            </Head>

            <div className={classes["product_error--BLOCK"]}>
              <div className={classes["product_error_content--WRAPPER"]}>
                <h3 className={`lg_font`}>Error: Books and Movies are not supported, maybe in the future.</h3>
                <button onClick={() => router.replace("/")} type="button" className={`${classes["page_reload--BTN"]} md_font`}>back to home</button>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Head>
              <title>Amazon | {product.name}</title>
            </Head>
            <main className={classes["product_infos--BLOCK"]}>
              <Main_layout>
                {!!router.query.k && (
                  <Link className={classes["backToResults--BTN"]} href={`/search?k=${router.query.k}`}>
                    <i className={classes["backToResults--ICON"]}></i>
                    <span className={`${classes["backToResults--TEXT"]} sm_font`}>back to results</span>
                  </Link>
                )}
                <section className={`${classes["product_details--HEADER"]} ${classes["product_details--DESKTOP"]}`} >
                  <div className={ classes["product_details_header_blocks--CONTAINER"] } >
                    <div className={classes["product_images--BLOCK"]}>
                      <div className={ classes["product_images_block_content--WRAPPER"] } >
                        <div className={classes["product_images--CONTAINER"]}>
                          {product.images.filter((productImageUrl) =>!productImageUrl.includes(".gif")).map((productImageUrl, idx) => {
                              return (
                                <button
                                  key={Math.floor(Math.random() * 8888888888)} type="button" onClick={() => setSelectedProductImageIdx(idx) }
                                  className={`${classes["product_image--BTN"]} ${ idx === selectedProductImageIdx && classes["selected_product_image"] }`} >
                                  <Image
                                    src={productImageUrl}
                                    fill={true}
                                    style={{objectFit:"contain"}}
                                    alt="something"
                                  />
                                </button>
                              );
                            })}
                        </div>
                        <div className={classes["selected_product_image--BLOCK"]} >
                          <span className={classes["product_image--CONTAINER"]}>
                            <Image
                              src={product.images[selectedProductImageIdx]}
                              fill={true}
                              style={{objectFit:"contain"}}
                              alt="something"
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={classes["product_details--BLOCK"]}>
                      <div className={classes["product_details_block_content--WRAPPER"]}>
                        <h2 role="title" className={`${classes["product_title--EL"]} lg_font`}>{product.name}</h2>
                        {!!product.product_information?.brand && product.brand_url ?
                          <Link className={`${classes["product_brand__EL"]} ${classes["productBrand_store__LINK"]} md_font`} target="_blank" href={product.brand_url}>{product.product_information?.brand}</Link> :
                          <span className={`${classes["product_brand__EL"]} md_font`}>{product.product_information?.brand}</span>
                        }

                        {!!product.average_rating && (
                          <div className={classes["product__rating_AND_reviews__BLOCK"]}>
                            <div className={ classes["rating_AND_reviews__CONTENT_WRAPPER"]}>
                              <span className={`${classes["product_averageRating__EL"]} md_font`}>{product.average_rating}</span>

                              <i title={`${product.average_rating}/5`}
                                data-review_stars={product_review_stars__FUNC(product.average_rating)}
                                className={classes["product_stars--ICON"]}
                              ></i>

                              <span className={`${classes["product_totalRatings__EL"]} md_font`}>({product.total_ratings})</span>
                            </div>
                          </div>
                        )}

                        <hr />

                        {!!product.pricing && (
                          <div className={classes["product_price--CONTAINER"]}>
                            <ProductPrice price={product.pricing} />
                          </div>
                        )}

                        {!!productStyles && !!Object.keys(productStyles).length && 
                          Object.keys(productStyles).map((product_customization_option) => {
                            return (
                              productStyles[product_customization_option] && (
                                <div key={Math.floor(Math.random() * 9999999999)} className={classes["product_options--BLOCK"]}>
                                  <h6 className={`${classes["product_options_header--EL"]} md_font`}>
                                    {product_customization_option.toUpperCase()}:{" "}
                                    <span className={classes["style_selected--EL"]}>
                                      {productStyles[product_customization_option].find((productStyle) => productStyle.is_selected).value}
                                    </span>
                                  </h6>

                                  {productStyles[product_customization_option]?.length && (
                                    <div className={classes["product_options--CONTAINER"]}>
                                      {productStyles[product_customization_option].filter(customization_option => customization_option.asin).map((product_customization_option_item,idx) => {
                                          return (
                                            <button 
                                              key={idx} 
                                              className={`${classes["product_option--BTN"]} ${product_customization_option_item.is_selected && classes["active_product_option"]}`}
                                              onClick={() => router.push(`/dp?asin=${product_customization_option_item.asin}`)}
                                            >
                                              <div className={classes["product_option_content--WRAPPER"]}>
                                                {product_customization_option_item.image && (
                                                  <div className={classes["product_option_image--CONTAINER"]}>
                                                    <Image
                                                      src={product_customization_option_item.image}
                                                      fill={true}
                                                      style={{objectFit:"contain"}}
                                                      alt={product_customization_option_item.value}
                                                    />
                                                  </div>
                                                )}
                                                <div className={classes["product_option_typos--WRAPPER"]}>
                                                  <span className={`${classes["product_option_title--EL"]} md_lg_font`}>
                                                    {product_customization_option_item.value}
                                                  </span>
                                                  <span className={`${classes["product_option_price--EL"]} sm_font`}>
                                                    {product_customization_option_item.price_string || "- -"}
                                                  </span>
                                                </div>
                                              </div>
                                            </button>
                                          );
                                        }
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))
                            })}

                        <hr />

                        {!!product.feature_bullets?.length && (
                          <div className={classes["productFeaturesList__BLOCK"]}>
                            <div className={classes["productFeaturesList__CONTENT_WRAPPER"]}>
                              <ul className={classes["productFeatures__LIST"]}>
                                {product.feature_bullets.map(feature => <li className={`${classes["productFeature__LIST_ITEM"]} md_font`}>{feature}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/*{!!product.full_description && (
                          <div className={classes["aboutThisProduct--BLOCK"]}>
                            <div className={classes["aboutThisProduct_content--WRAPPER"]}>
                              <span className={`${classes["aboutThisProduct_block--HEADER"]} md_font`}>about this product</span>
                              <p className={`${classes["aboutThisProduct_infos--PARAGRAPH"]} md_font`}>
                                {product.full_description.includes("  ") ?
                                  product.full_description.replace("About this item\n \n", "").replace("› See more product details",".").split("  ").map((smallDescPart) => {
                                    return <span key={Math.floor(Math.random() * 999999999)}>{smallDescPart}</span>
                                  })
                                  : product.full_description.replace("About this item\n \n", "").replace("› See more product details",".")
                                }
                              </p>

                              <Link href="javascript:void(0)" className={classes["moreProductDetails--LINK"]}>
                                  <i className={ classes["moreProductDetails_link--ICON"] } ></i>
                                  <span className={`${classes["moreProductDetails_link--TEXT"]} md_font`} > See more product details </span>
                              </Link>
                            </div>
                          </div>
                        )}*/}
                      </div>
                    </div>

                    <div className={classes["product_shipping--BLOCK"]}>
                      <div className={ classes["product_shipping_details_content--WRAPPER"] } >
                        {!!product.pricing && (
                          <div className={classes["product_price--CONTAINER"]}>
                            <ProductPrice price={product.pricing} />
                          </div>
                        )}

                        {!!product.availability_status &&
                          (product.availability_status.includes("   ") ? (
                            <div className={classes["product_availability--BLOCK"]} >
                              {product.availability_status.split("   ").map((availability_status_property, idx) => {
                                  return idx === 0 ? (
                                    <span className={`${classes["product_limited_stock--TITLE"]} lg_font`} > {availability_status_property} </span>
                                  ) : (
                                    !!availability_status_property.trim() && (
                                      <span className={`${classes["product_limited_stock--BODY"]} md_font`} > {availability_status_property.trim()} </span>
                                    )
                                  );
                                })}
                            </div>
                          ) : (
                            <div className={classes["product_availability--BLOCK"]}>
                              <span className={`${classes["product_limited_stock--TITLE"]} lg_font`}>{product.availability_status}</span>
                            </div>
                          ))}

                        <div className={classes["cta_btns--CONTAINER"]}>
                          <button
                            type="button"
                            className={`${classes["product_cta--BTN"]} ${classes["product_atc--BTN"]} md_font`}
                            onClick={addProductToCart__HANDLER}
                          >add to cart</button>

                          {product?.product_information?.ASIN && (
                            <Link
                              className={`${classes["product_cta--BTN"]} ${classes["product_purchase--BTN"]} md_font`}
                              target="_blank"
                              href={`https://www.amazon.com/dp/${product.product_information.ASIN}`}
                            >buy now</Link>
                          )}
                        </div>

                        <div className={classes["product_seller_infos--BLOCK"]}>
                          {product.fulfilled_by_amazon && (
                            <div className={`${classes["product_seller_info--CONTAINER"]} sm_font`} >
                              <span className={ classes["product_seller_info--TITLE"] } > ships from: </span>
                              <span className={classes["product_seller_info--BODY"]} > amazon </span>
                            </div>
                          )}

                          {product.seller_name && (
                            <div className={`${classes["product_seller_info--CONTAINER"]} sm_font`}>
                              <span className={classes["product_seller_info--TITLE"]}>sold by:</span>
                              <span className={classes["product_seller_info--BODY"]}>{product.seller_name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className={classes["product_details_sections_separater--EL"]}/>

                <section id="product_information" className={`${classes["product_details--SECTION"]} ${classes["product_technicalDetails--SECTION"]}`}>
                  <div className={ classes["product_details_section_content--WRAPPER"]}>
                    <h3 className={`${classes["product_details_section--TITLE"]} lg_font`}>product information</h3>

                    <div className={`${classes["product_details_content--WRAPPER"]} ${classes["product_information_content--WRAPPER"]}`}>
                      <div className={classes["product_information_twoParter--CONTAINER"]}>
                        {!!Object.keys(product.product_information).length && (
                          <div className={classes["product_information_leftPart--WRAPPER"]}>
                            <Fragment>
                              <div className={classes["product_information--HEADER"]}>
                                <h4 className={`${classes["product_information_part--TITLE"]} lg_font`}>Technical Details</h4>

                                <Link onClick={() => setProductInformationTable_collapsed((prev) => !prev)} href="javascript:void(0)"className={`${classes["technical_details_table_expandation_control--BTN"]} sm_font`} >
                                  <i className={`${ classes["expandation--ICON"] } ${productInformationTable_collapsed && classes["spin_expandation--ICON"] }`} ></i>
                                  <span> {productInformationTable_collapsed ? "expand" : "collapse"}{" "} all</span>
                                </Link>
                              </div>

                              <div className={`${classes["product_summary_information_table--WRAPPER"]} ${productInformationTable_collapsed && classes["summary_information_table_collapsed"]}`}>
                                <table className={classes["product_summary_information--TABLE"]}>
                                  <tbody>
                                    {Object.keys(product.product_information).length <= 10 ? 
                                      Object.keys(product.product_information).map((productInfo) => {
                                        return (
                                          <tr key={productInfo}>
                                            <td className={`${classes["product_information_table_row--TITLE"]} md_font`}>{productInfo}</td>

                                            <td className={`${classes["product_information_table_row--BODY"]} md_font`}>
                                              {typeof product.product_information[productInfo] === "string" ? 
                                                product.product_information[productInfo] : 
                                                Object.keys(product.product_information[productInfo]).map((subProductInfo) => {
                                                  return (
                                                    <Fragment key={Math.floor(Math.random() * 999999999)}>
                                                      <div>
                                                        <span>{subProductInfo}:{" "}</span>{" "}
                                                        <span>{product.product_information[productInfo][subProductInfo]}</span>
                                                      </div>
                                                    </Fragment>
                                                  )
                                                })
                                              }
                                            </td>
                                          </tr>
                                        );
                                      }) : 
                                    Object.keys(product.product_information).filter((productInfo) => productInfo.toLowerCase() !== "asin" && productInfo.toLowerCase() !== "best sellers rank" && productInfo.toLowerCase() !== "date first available").map((productInfo) => {
                                      const product_TechnicalDetail__TITLE = productInfo.replaceAll("_", " ");

                                      return product.product_information[productInfo] ? (
                                        <tr key={productInfo}>
                                          <td className={`${classes["product_information_table_row--TITLE"]} md_font`}>{product_TechnicalDetail__TITLE}</td>

                                          <td className={`${classes["product_information_table_row--BODY"]} md_font`}>
                                            {typeof product.product_information[productInfo] === "string" ? 
                                              product.product_information[productInfo] : 
                                              Object.keys(product.product_information[productInfo]).map((subProductInfo) => {
                                                return (
                                                  <Fragment key={Math.floor(Math.random() * 999999999)}>
                                                    <div>
                                                      <span>
                                                        {subProductInfo}:{" "}
                                                      </span>{" "}
                                                      <span>{product.product_information[productInfo][subProductInfo]}</span>
                                                    </div>
                                                  </Fragment>
                                                );
                                              })
                                            }
                                          </td>
                                        </tr>
                                      ) : "";
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </Fragment>
                          </div>
                        )}
                        <div className={classes["product_information_rightPart--WRAPPER"]}>
                          {Object.keys(product.product_information).length > 10 && (
                            <Fragment>
                              <div className={classes["product_information--HEADER"]}>
                                <h4 className={`${classes["product_information_part--TITLE"]} lg_font`}>Additional Information</h4>
                              </div>

                              <table className={classes["product_summary_information--TABLE"]}>
                                <tbody>
                                  {Object.keys(product.product_information).filter((productInfo) => productInfo.trim().toLowerCase() === "asin" || productInfo.trim().toLowerCase() === "best sellers rank" || productInfo.trim().toLowerCase() === "date first available").map((productInfo) => {
                                    return (
                                      <tr key={productInfo}>
                                        <td className={`${classes["product_information_table_row--TITLE"]} md_font`}>{productInfo}</td>

                                        <td className={`${classes["product_information_table_row--BODY"]} md_font`}>{product.product_information[productInfo]}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </Fragment>
                          )}

                          <div className={classes["product_information_rightPart_warrantyANDsupport--BLOCK"]}>
                            <div className={classes["product_information--HEADER"]}>
                              <h4 className={`${classes["product_information_part--TITLE"]} lg_font`}>Warranty & Support</h4>
                              <p className={classes["product"]}></p>
                            </div>
                            <p className={`md_font ${classes["product_warrantyANDsupport--TEXT"]}}`}> Amazon.com Return Policy:You may return any new product purchased from Amazon.com that is &quot;dead on arrival,&quot; arrives in damaged condition, or is still in unopened boxes, for a full refund within 30 days of purchase. Amazon.com reserves the right to test &quot;dead on arrival&quot; returns and impose a customer fee equal to 15 percent of the product sales price if the customer misrepresents the condition of the product. Any returned product that is damaged through customer misuse, is missing parts, or is in unsellable condition due to customer tampering will result in the customer being charged a higher restocking fee based on the condition of the product. Amazon.com will not accept returns of any product more than 30 days after you receive the shipment. New, used, and refurbished products purchased from Marketplace vendors are subject to the returns policy of the individual vendor.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {!!product.full_description && (
                  <Fragment>
                    <div className={classes["product_details_sections_separater--EL"]}/>

                    <section id="product_description" className={`${classes["product_details--SECTION"]} ${classes["product_description--SECTION"]}`}>
                      <div className={classes["product_description__CONTENT_WRAPPER"]}>
                        <h3 className={`${classes["product_details_section--TITLE"]} lg_font`}>product description</h3>

                        <p className={`${classes["product_description__EL"]} md_font`}>{product.full_description}</p>
                      </div>
                    </section>
                  </Fragment>
                )}
              </Main_layout>
            </main>
          </Fragment>
        )}

        <Footer />
      </Page_layout>
    </Fragment>
  );
};

export default Dp;

export const getServerSideProps = async (req, res) => {
  const {asin} = req.query;

  let productDetails = null;
  let error = false;

  if (!!asin) {
    try {

      const req = await fetch(`${process.env.NEXT_PUBLIC_VERCEL__SCRAPER__API_URI}?api_key=${process.env.NEXT_PUBLIC_VERCEL__SCRAPER__API_KEY}&ASIN=${asin}&country_code=us&tld=com`);

      if (req.status !== 200) {
        throw Error("something is wrong!!");
      }

      const result = await req.json();

      console.log(result);

      productDetails = result;
      error = false;
    } catch (err) {
      console.log(err);
      error = true;
    }

    return {
      props: {
        product: productDetails,
        error,
      },
    };
  } else {
    return {
      props: {
        product: null,
        error: true,
      },
    };
  }
};
