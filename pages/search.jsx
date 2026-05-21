import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { auth } from "@Lib/FirebaseConfig";

import Main_layout from "@LayoutComps//Main_layout";

import Navbar from "@GlobalComps/Navbar";
import Footer from "@GlobalComps/Footer";

import Search_Results_Filter from "@SearchComps/Search_Results_Filter";
import Search_Result_Products from "@SearchComps/Search_Result_Products";

import classes from "@PagesStyles/Search.module.scss";

const Search = ({ products, error }) => {
  const router = useRouter();
  const { currentUser } = auth;

  const [showSortingMethods, setShowSortingMethods] = useState(false);
  const [filteredProductsArr, setFilteredProductsArr] = useState(products.results);

  const [filterByStars, setFilterByStars] = useState(null);
  const [filterByPrice, setFilterByPrice] = useState(null);
  const [priceRange, setPriceRange] = useState({});


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

        const price_range__FORM = document.getElementById("price_filter_method--FORM");

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
    const sortingBlock__EL = document.querySelector(`.${classes["sortBy_search_results--CONTAINER"]}`);
    const body__EL = document.body;

    const documentClickEvent__Handler = (evt) => {
      !sortingBlock__EL.contains(evt.target) && setShowSortingMethods(() => false);
    };

    body__EL.addEventListener("click", documentClickEvent__Handler);
  }, []);

  useEffect(() => {
    const { min } = priceRange;
    const { max } = priceRange;

    // filter products by Price and Stars Range
    if (!!filterByStars && !!filterByPrice) {
      setFilteredProductsArr(() => {
        return products.filter((item) => {
            if (filterByStars === "1-up") return item.stars >= 1;
            if (filterByStars === "2-up") return item.stars >= 2;
            if (filterByStars === "3-up") return item.stars >= 3;
            if (filterByStars === "4-up") return item.stars >= 4;
          }).filter((item) => {
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
        switch(filterByStars){
          case "1-up":
            return products.filter((item) => item.stars >= 1);
            break;
          case "2-up":
            return products.filter((item) => item.stars >= 2);
            break;
          case "3-up":
            return products.filter((item) => item.stars >= 3);
            break;
          case "4-up":
            return products.filter((item) => item.stars >= 4);
            break;
        }
      });
    }

    // filter products by Price Range
    if (!filterByStars && !!filterByPrice) {
      setFilteredProductsArr(() => {

        switch (filterByPrice){
          case "under-25":
            return products.filter((item) => item.price < 25);
            break;
          case "25->50":
            return products.filter((item) => item.price >= 25 && item.price <= 50);
            break;
          case "50->100":
            return products.filter((item) => item.price >= 50 && item.price <= 100);
            break;
          case "100->200":
            return products.filter((item) => item.price >= 100 && item.price <= 200);
            break;
          case "over-200":
            return products.filter((item) => item.price > 200);
            break;
        }

        if (filterByPrice === "custom") {
          if (!!min && !max)
            return products.filter((item) => item.price > min);
          if (!min && !!max)
            return products.filter((item) => item.price < max);
          if (!!min && !!max)
            return products.filter((item) => item.price > min && item.price < max);
        }
      });
    }

    if (!filterByStars && !filterByPrice) setFilteredProductsArr(products);

  }, [filterByPrice, filterByStars, products, priceRange]);

  return (
    <Fragment>
      <Navbar />

      <div className={classes["keyword_search--BLOCK"]}>
        <div className={classes["keyword_search_results_eyebrow--BLOCK"]}>
          <Main_layout>
            <div className={classes["keyword_search_results_eyebrow_content--CONTAINER"]}>
              <span className={`${classes["keyword_search_results_length--EL"]} md_lg_font`}>
                {products?.length} results for{" "}
                <span className={classes["search_results_keyword--EL"]}>"{router.query?.k}"</span>
              </span>
              <div className={classes["sortBy_search_results--CONTAINER"]}>
                <button
                  onClick={toggleSortingResultsMethods__Handler}
                  className={classes["sortBy_search_results--BTN"]}
                >
                  <div className={`${classes["sortBy_btn_content--CONTAINER"]} md_font`}>
                    <span>sort by:</span>
                    <span className={classes["selected_sortBy_method"]}>
                      {router.query.s !== "review-rank" && router.query.s !== "price-asc" && router.query.s !== "price-desc" ? "features" : ""}
                      {router.query.s === "review-rank" && "avg. customer review"}
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
                        <Link 
                          className={`${classes["sortBy_method--EL"]} md_font ${
                            router.query.s !== "review-rank" &&
                            router.query.s !== "price-asc" &&
                            router.query.s !== "price-desc" &&
                            classes["selected_sorting_method"]
                          }`}
                          onClick={() =>setShowSortingMethods((prev) => false)}
                          href={`${router.route}?k=${router.query.k}`}>features</Link>
                      </li>
                      <li>
                        <Link
                          className={`${classes["sortBy_method--EL"]} md_font ${router.query.s === "price-asc" && classes["selected_sorting_method"]}`}
                          onClick={() =>setShowSortingMethods((prev) => false)}
                          href={`${router.route}?k=${router.query.k}&s=price-asc`}
                        >price: low to high</Link>
                      </li>
                      <li>
                        <Link 
                          className={`${classes["sortBy_method--EL"]} md_font ${router.query.s === "price-desc" && classes["selected_sorting_method"]}`}onClick={() =>setShowSortingMethods((prev) => false)}
                          href={`${router.route}?k=${router.query.k}&s=price-desc`}
                        >price: high to low</Link>
                      </li>
                      <li>
                        <Link 
                          className={`${classes["sortBy_method--EL"]} md_font ${router.query.s === "review-rank" && classes["selected_sorting_method"]}`}
                          href={`${router.route}?k=${router.query.k}&s=review-rank`}
                        >avg. customer review</Link>
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
            <main className={classes["keyword_search_results_content--WRAPPER"]}>
              <Search_Results_Filter
                filterProductsByStars__HANDLER={filterProductsByStars__HANDLER}
                filterProductsByPrice__HANDLER={filterProductsByPrice__HANDLER}
                filterProductsByPriceRange__HANDLER={filterProductsByPriceRange__HANDLER}
                clearFilter__HANDLER={clearFilter__HANDLER}
                filterByStars={filterByStars}
                filterByPrice={filterByPrice}
              />
             <Search_Result_Products
                products={products}
                ads={products.ads}
                error={error}
              />
            </main>
          </Main_layout>
        </div>

        {!currentUser ? (
          <div className={classes["signin--BLOCK"]}>
            <div className={classes["signin_content--WRAPPER"]}>
              <span className={`${classes["signin--HEADER"]} md_font`}>see personalized history</span>
              <button
                type="button"
                className={`${classes["signin--BTN"]} md_font`}
                onClick={() => router.push("/signin")}
              >Sign in</button>
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

      const req = await fetch(`${process.env.NEXT_PUBLIC_VERCEL__SERPAPI__API_URI}&k=${encodeURI(keyword)}&api_key=${process.env.NEXT_PUBLIC_VERCEL__SERPAPI__API_KEY}`);

      if (req.status !== 200) {
        throw Error("Something Went Wrong!!");
      }

      const searchResults = await req.json();

      const productsList = searchResults.organic_results;

      if (productsList?.length) {
        if (!!sorting_method) {
          let sorted_results;

          // Low to High __ Price
          if (sorting_method === "price-asc")
            sorted_results = results.sort((a, b) => a.extracted_price - b.extracted_price);

          // High to Low __ Price
          if (sorting_method === "price-desc")
            sorted_results = results.sort((a, b) => b.extracted_price - a.extracted_price);

          // review rank
          if (sorting_method === "review-rank")
            sorted_results = results.sort((a, b) => b.rating - a.rating);

          if (sorting_method === "price-asc" || sorting_method === "price-desc" || sorting_method === "review-rank"){
            return {
              props: {
                products: sorted_results,
                error: false,
              }
            }
          };
        }

        return {
          props: {
            products: productsList,
            error: false,
          }
        }
      } else {
        throw Error("Something Went Wrong!!");
      }
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
  }
}
