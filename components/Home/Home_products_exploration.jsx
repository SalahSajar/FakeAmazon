import { Fragment } from "react";

import Main_layout from "../Layout/main_layout";

import Home_products_card from "./Home_products_card";
import Home_products_slider from "./Home_products_slider";

import classes from "../../styles/Components/Home/Home_products_exploration.module.scss";

const categories_card_links_infos = [
  {
    title: "Computers & Accessories",
    href: "/search?k=computers & accessories",
    bg_path:
      "/home_redirection_links_bg/categories/computers & accessories.jpg",
  },
  {
    title: "video games",
    href: "/search?k=games",
    bg_path: "/home_redirection_links_bg/categories/video games.jpg",
  },
  {
    title: "baby",
    href: "/search?k=baby",
    bg_path: "/home_redirection_links_bg/categories/baby.jpg",
  },
  {
    title: "toys & games",
    href: "/search?k=toys",
    bg_path: "/home_redirection_links_bg/categories/toys & games.jpg",
  },
];

const Home_products_exploration = () => {
  return (
    <Fragment>
      <Main_layout>
        <section className={classes["products_exploration--BLOCK"]}>
          <div className={classes["products_exploration_content--CONTAINER"]}>
            <div className={classes["products_carts--CONTAINER"]}>
              <Home_products_card
                title="best sellers in electronics"
                keyword="electronics"
                purpose="products recommendation"
              />
              <Home_products_card
                title="Shop by Category"
                purpose="multi categories redirection card"
                categories={categories_card_links_infos}
              />
              <Home_products_card
                title="Beauty picks"
                purpose="redirection card"
                link={`/search?k=${encodeURI("beauty")}`}
              />
              <Home_products_card
                title="Shop Father's Day Gifts"
                purpose="redirection card"
                link={`/`}
              />

              <Home_products_card
                title="Health & Personal Care"
                purpose="redirection card"
                link={`/search?k=${encodeURI("personal care")}`}
              />
              <Home_products_card
                title="Deal of the Day"
                purpose="redirection card"
                link={`/`}
              />
              <Home_products_card
                title="Computers & Accessories"
                purpose="redirection card"
                link={`/search?k=${encodeURI("Computers & Accessories")}`}
              />
              <Home_products_card
                title="Get fit at home"
                purpose="redirection card"
                link={`/search?k=${encodeURI("home fitness accessories")}`}
              />
            </div>

            <Home_products_slider
              title="most wished for baby travel gear"
              keyword="baby travel gear"
            />
            <Home_products_slider
              title="most wished for kids books"
              keyword="kids book"
            />

            <div className={classes["products_carts--CONTAINER"]}>
              <Home_products_card
                title="best sellers in pet supplies"
                purpose="top products recommendation card"
                keyword="pet supplies"
              />
              <Home_products_card
                title="best sellers in movies & tv"
                purpose="top products recommendation card"
                keyword="movie"
              />
              <Home_products_card
                title="best sellers in toys & games"
                purpose="top products recommendation card"
                keyword="toys and games"
              />
              <Home_products_card
                title="best sellers in sport goods"
                purpose="top products recommendation card"
                keyword="sport goods"
              />
            </div>

            <Home_products_slider
              title=" most wished for car cares"
              keyword="car care"
            />
            <Home_products_slider
              title="most wished for cell phones"
              keyword="cell phones"
            />

            <div className={classes["products_carts--CONTAINER"]}>
              <Home_products_card
                title="best sellers in beauty & personal care"
                purpose="top products recommendation card"
                keyword="personal care"
              />
              <Home_products_card
                title="best sellers in gaming accessories"
                purpose="top products recommendation card"
                keyword="gaming accessories"
              />
              <Home_products_card
                title="Shop Laptops & Tablets"
                purpose="redirection card"
                link={`/search?k=${encodeURI("Laptops & Tablets")}`}
              />
              <Home_products_card
                title="Create with strip lights"
                purpose="redirection card"
                link={`/search?k=${encodeURI("strip lights")}`}
              />
            </div>

            <Home_products_slider
              title="most wished for jewelries"
              keyword="jewelry"
            />
            <Home_products_slider
              title="most wished for home wall decors"
              keyword="home wall decor"
            />

            <div className={classes["products_carts--CONTAINER"]}>
              <Home_products_card
                title="For your Fitness Needs"
                purpose="redirection card"
                link={`/search?k=${encodeURI("fitness")}`}
              />
              <Home_products_card
                title="Shop activity trackers and smartwatches"
                purpose="redirection card"
                link={`/search?k=${encodeURI("smartwatches")}`}
              />
              <Home_products_card
                title="Shop Pet supplies"
                purpose="redirection card"
                link={`/search?k=${encodeURI("pet supplies")}`}
              />
              <Home_products_card
                title="best sellers in baby"
                purpose="top products recommendation card"
                keyword="baby"
              />
            </div>

            <Home_products_slider
              title="most wished for kitchen improvement"
              keyword="kitchen improvements"
            />
          </div>
        </section>
      </Main_layout>
    </Fragment>
  );
};

export default Home_products_exploration;
