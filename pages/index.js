import { Fragment, useState} from "react";
import Link from "next/link";
import Head from "next/head";

import Image from "next/image";

// Navbar Component
import Navbar from "../components/Global/Navbar";

// Home Products Exploration Component
import Home_products_exploration from "../components/Home/Home_products_exploration";

// Browsing History Component
import Browsing_history from "../components/Global/Browsing_history";

// Page Layout Component
import Page_layout from "../components/Layout/Page_layout";

// Page Footer Component
import Footer from "../components/Global/Footer";

import classes from "../styles/Pages/Home.module.scss";

const slider_links = [
  "beauty_selections",
  "computer&accessories",
  "discover_products",
  "gift_for_dads",
  "toys&games"
];

export default function Home() {
  const [sliderIndex,setSliderIndex] = useState(0);

  const changeSliderIndex = (direction) => {
    if(direction === "-"){
      !sliderIndex && setSliderIndex(() => slider_links.length - 1);
      !!sliderIndex && setSliderIndex(prev => prev-=1);
    }
    if(direction === "+"){
      sliderIndex === slider_links.length - 1 && setSliderIndex(() => 0);
      sliderIndex !== slider_links.length - 1 && setSliderIndex(prev => prev+=1);
    }
  }

  return (
    <Fragment>

      <Head>
        <title>Amazon.com. Spend less. Smile more</title>
      </Head>

      <Page_layout>
        <div className={classes["home--CONTAINER"]}>
          <Navbar />

          <div className={classes["homePage_slider--BLOCK"]}>
            <div className={classes["homePage_slider_controls--CONTAINER"]}>
              <button onClick={() => changeSliderIndex("-")} className={classes["homePage_slider_btn"]} type="button">
                <i className={`${classes["homePage_slider--ICON"]} ${classes["left_arrow--ICON"]}`}></i>
              </button>
              <Link href="javascript:void(0)">
                <a className={classes["slider_item_link"]}></a>
              </Link>
              <button onClick={() => changeSliderIndex("+")} className={classes["homePage_slider_btn"]} type="button">
                <i className={`${classes["homePage_slider--ICON"]} ${classes["right_arrow--ICON"]}`}></i>
              </button>
            </div>

            <div className={classes["slider_bgs--BLOCK"]}>
              <ol style={{transform:`translateX(calc(-100vw * ${sliderIndex}))`}} className={classes["slider_bgs--CONTAINER"]}>
                {
                  slider_links.map(sliderLink => {
                    return (
                      <li key={sliderLink}>
                        <Image src={`/home_links_slider/${sliderLink}.jpg`} priority={true} layout="fill" objectFit="cover" alt={sliderLink} />
                      </li>
                    )
                  })
                }
              </ol>
            </div>

          </div>

          <Home_products_exploration />

          <Browsing_history />

          <Footer />
        </div>
      </Page_layout>
    </Fragment>
  )
}
