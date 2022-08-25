import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { auth } from "../lib/FirebaseConfig";

import Main_layout from "../components/Layout/Main_layout";

import Navbar from "../components/Global/Navbar";
import Footer from "../components/Global/Footer";

import Search_Results_Filter from "../components/Search/Search_Results_Filter";
import Search_Result_Products from "../components/Search/Search_Result_Products";

import classes from "../styles/Pages/Search.module.scss";

const Search = ({ products, error }) => {
  const { currentUser } = auth;

  const originalProductsArr = products.results;
  const [showSortingMethods, setShowSortingMethods] = useState(false);
  const [filteredProductsArr, setFilteredProductsArr] = useState(
    products.results
  );

  const [filterByStars, setFilterByStars] = useState(null);
  const [filterByPrice, setFilterByPrice] = useState(null);
  const [priceRange, setPriceRange] = useState({});

  const router = useRouter();

  const toggleSortingResultsMethods__Handler = () =>
    setShowSortingMethods((prev) => !prev);

  const filterProductsByStars__HANDLER = (ctx) => setFilterByStars(ctx);
  const filterProductsByPrice__HANDLER = (ctx) => setFilterByPrice(ctx);
  const filterProductsByPriceRange__HANDLER = (ctx) => setPriceRange(ctx);

  const clearFilter__HANDLER = (filterBy) => {
    if (!!filterBy) {
      if (filterBy === "stars") setFilterByStars(null);
      if (filterBy === "price") {
        setFilterByPrice(null);

        const price_range__FORM = document.getElementById(
          "price_filter_method--FORM"
        );

        price_range__FORM.min_price.value = "";
        price_range__FORM.max_price.value = "";
      }
    }
  };

  useEffect(() => {
    if (!router.query?.k) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    const sortingBlock__EL = document.querySelector(
      `.${classes["sortBy_search_results--CONTAINER"]}`
    );
    const body__EL = document.body;

    const documentClickEvent__Handler = (evt) => {
      !sortingBlock__EL.contains(evt.target) &&
        setShowSortingMethods(() => false);
    };

    body__EL.addEventListener("click", documentClickEvent__Handler);
  }, []);

  useEffect(() => {
    const { min } = priceRange;
    const { max } = priceRange;

    // filter products by Price and Stars Range
    if (!!filterByStars && !!filterByPrice) {
      setFilteredProductsArr(() => {
        return originalProductsArr
          .filter((item) => {
            if (filterByStars === "1-up") return item.stars >= 1;
            if (filterByStars === "2-up") return item.stars >= 2;
            if (filterByStars === "3-up") return item.stars >= 3;
            if (filterByStars === "4-up") return item.stars >= 4;
          })
          .filter((item) => {
            if (filterByPrice === "under-25") return item.price < 25;
            if (filterByPrice === "50->100")
              return item.price >= 25 && item.price <= 50;
            if (filterByPrice === "100->200")
              return item.price >= 100 && item.price <= 200;
            if (filterByPrice === "over-200") return item.price > 200;

            if (filterByPrice === "custom") {
              if (!!priceRange.min && !priceRange.max)
                return item.price > priceRange.min;
              if (!priceRange.min && !!priceRange.max)
                return item.price < priceRange.max;
              if (!!priceRange.min && !!priceRange.max)
                return (
                  item.price > priceRange.min && item.price < priceRange.max
                );
            }
          });
      });
    }

    // filter products by Stars Range
    if (!!filterByStars && !filterByPrice) {
      setFilteredProductsArr((prev) => {
        if (filterByStars === "1-up")
          return originalProductsArr.filter((item) => item.stars >= 1);
        if (filterByStars === "2-up")
          return originalProductsArr.filter((item) => item.stars >= 2);
        if (filterByStars === "3-up")
          return originalProductsArr.filter((item) => item.stars >= 3);
        if (filterByStars === "4-up")
          return originalProductsArr.filter((item) => item.stars >= 4);
      });
    }

    // filter products by Price Range
    if (!filterByStars && !!filterByPrice) {
      setFilteredProductsArr(() => {
        if (filterByPrice === "under-25")
          return originalProductsArr.filter((item) => item.price < 25);
        if (filterByPrice === "25->50")
          return originalProductsArr.filter(
            (item) => item.price >= 25 && item.price <= 50
          );
        if (filterByPrice === "50->100")
          return originalProductsArr.filter(
            (item) => item.price >= 50 && item.price <= 100
          );
        if (filterByPrice === "100->200")
          return originalProductsArr.filter(
            (item) => item.price >= 100 && item.price <= 200
          );
        if (filterByPrice === "over-200")
          return originalProductsArr.filter((item) => item.price > 200);

        if (filterByPrice === "custom") {
          if (!!min && !max)
            return originalProductsArr.filter((item) => item.price > min);
          if (!min && !!max)
            return originalProductsArr.filter((item) => item.price < max);
          if (!!min && !!max)
            return originalProductsArr.filter(
              (item) => item.price > min && item.price < max
            );
        }
      });
    }

    if (!filterByStars && !filterByPrice) {
      setFilteredProductsArr(originalProductsArr);
    }
  }, [filterByPrice, filterByStars, originalProductsArr, priceRange]);

  return (
    <Fragment>
      <Navbar />
      <div className={classes["keyword_search--BLOCK"]}>
        <div className={classes["keyword_search_results_eyebrow--BLOCK"]}>
          <Main_layout>
            <div
              className={
                classes["keyword_search_results_eyebrow_content--CONTAINER"]
              }
            >
              <h4
                className={`${classes["keyword_search_results_length--EL"]} md_lg_font`}
              >
                {originalProductsArr?.length} results for{" "}
                <span className={classes["search_results_keyword--EL"]}>
                  &quot;{router.query?.k}&quot;
                </span>
              </h4>
              <div className={classes["sortBy_search_results--CONTAINER"]}>
                <button
                  onClick={toggleSortingResultsMethods__Handler}
                  className={classes["sortBy_search_results--BTN"]}
                >
                  <div
                    className={`${classes["sortBy_btn_content--CONTAINER"]} md_font`}
                  >
                    <span>sort by:</span>
                    <span className={classes["selected_sortBy_method"]}>
                      {router.query.s !== "review-rank" &&
                      router.query.s !== "price-asc" &&
                      router.query.s !== "price-desc"
                        ? "features"
                        : ""}
                      {router.query.s === "review-rank" &&
                        "avg. customer review"}
                      {router.query.s === "price-asc" && "price: low to high"}
                      {router.query.s === "price-desc" && "price: high to low"}
                    </span>
                    <i className={classes["dropdown_icon"]}></i>
                  </div>
                </button>
                {showSortingMethods && (
                  <div className={classes["sortBy_methods--BLOCK"]}>
                    <ul>
                      <li>
                        <Link href={`${router.route}?k=${router.query.k}`}>
                          <a
                            className={`${
                              classes["sortBy_method--EL"]
                            } md_font ${
                              router.query.s !== "review-rank" &&
                              router.query.s !== "price-asc" &&
                              router.query.s !== "price-desc" &&
                              classes["selected_sorting_method"]
                            }`}
                            onClick={() =>
                              setShowSortingMethods((prev) => false)
                            }
                          >
                            features
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${router.route}?k=${router.query.k}&s=price-asc`}
                        >
                          <a
                            className={`${
                              classes["sortBy_method--EL"]
                            } md_font ${
                              router.query.s === "price-asc" &&
                              classes["selected_sorting_method"]
                            }`}
                            onClick={() =>
                              setShowSortingMethods((prev) => false)
                            }
                          >
                            price: low to high
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${router.route}?k=${router.query.k}&s=price-desc`}
                        >
                          <a
                            className={`${
                              classes["sortBy_method--EL"]
                            } md_font ${
                              router.query.s === "price-desc" &&
                              classes["selected_sorting_method"]
                            }`}
                            onClick={() =>
                              setShowSortingMethods((prev) => false)
                            }
                          >
                            price: high to low
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${router.route}?k=${router.query.k}&s=review-rank`}
                        >
                          <a
                            className={`${
                              classes["sortBy_method--EL"]
                            } md_font ${
                              router.query.s === "review-rank" &&
                              classes["selected_sorting_method"]
                            }`}
                          >
                            avg. customer review
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Main_layout>
        </div>

        <div className={classes["keyword_search_results--BLOCK"]}>
          <Main_layout>
            <div className={classes["keyword_search_results_content--WRAPPER"]}>
              <Search_Results_Filter
                filterProductsByStars__HANDLER={filterProductsByStars__HANDLER}
                filterProductsByPrice__HANDLER={filterProductsByPrice__HANDLER}
                filterProductsByPriceRange__HANDLER={
                  filterProductsByPriceRange__HANDLER
                }
                clearFilter__HANDLER={clearFilter__HANDLER}
                filterByStars={filterByStars}
                filterByPrice={filterByPrice}
              />
              <Search_Result_Products
                products={filteredProductsArr}
                ads={products.ads}
                error={error}
              />
            </div>
          </Main_layout>
        </div>

        {!currentUser ? (
          <div className={classes["signin--BLOCK"]}>
            <div className={classes["signin_content--WRAPPER"]}>
              <span className={`${classes["signin--HEADER"]} md_font`}>
                see personalized history
              </span>
              <button
                type="button"
                className={`${classes["signin--BTN"]} md_font`}
                onClick={() => router.push("/signin")}
              >
                Sign in
              </button>
              <span className={`${classes["signin--FOOTER"]} sm_font`}>
                new customer? <Link href="/register">Start here.</Link>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}

        <Footer />
      </div>
    </Fragment>
  );
};

export default Search;

export async function getServerSideProps(req, res) {
  const keyword = req.query.k;
  const sorting_method = req.query.s?.toLowerCase();

  if (!!keyword) {
    try {
      let results = [];

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            process.env.RAPIDAPI_KEY || process.env.VERCEL_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "amazon-ecommerce-data-scrapper.p.rapidapi.com",
        },
      };
      const req = await fetch(
        `https://amazon-ecommerce-data-scrapper.p.rapidapi.com/search/${encodeURI(
          keyword
        )}?api_key=${
          process.env.SCAPPERAPI_KEY || process.env.VERCEL_SCAPPERAPI_KEY
        }`,
        options
      );

      if (req.status !== 200) {
        throw Error("Something Went Wrong!!");
      }

      const search_results = await req.json();

      if (!!search_results.results.length) {
        results = search_results.results.reduce((acc, productObj) => {
          if (!acc.some((item) => item.name === productObj.name)) {
            acc.push(productObj);
          }
          return acc;
        }, []);

        if (!!sorting_method) {
          let sorted_results;

          // Low to High __ Price
          if (sorting_method === "price-asc")
            sorted_results = results.sort((a, b) => a.price - b.price);

          // High to Low __ Price
          if (sorting_method === "price-desc")
            sorted_results = results.sort((a, b) => b.price - a.price);

          // review rank
          if (sorting_method === "review-rank")
            sorted_results = results.sort((a, b) => b.stars - a.stars);

          if (
            sorting_method === "price-asc" ||
            sorting_method === "price-desc" ||
            sorting_method === "review-rank"
          )
            results = sorted_results;
        }
      } else {
        throw Error("Something Went Wrong!!");
      }

      return {
        props: {
          products: {
            ads: search_results.ads,
            results,
          },
          error: false,
        },
      };
    } catch (err) {
      return {
        props: {
          products: {
            ads: [],
            results: [],
          },
          error: true,
        },
      };
    }
  } else {
    return {
      props: {
        products: {
          ads: [],
          results: [],
        },
        error: true,
      },
    };
  }
}
