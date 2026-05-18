import { Fragment, useState, useEffect} from "react";
import Link from "next/link";
import Head from "next/head";

import Image from "next/image";

// Navbar Component
import Navbar from "@GlobalComps/Navbar";

// Home Products Exploration Component
import Home_products_exploration from "@HomeComps/Home_products_exploration";

// Browsing History Component
import Browsing_history from "@GlobalComps/Browsing_history";

// Page Layout Component
import Page_layout from "@LayoutComps/Page_layout";

// Page Footer Component
import Footer from "@GlobalComps/Footer";

import classes from "@PagesStyles/Home.module.scss";

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

  // useEffect(() => {
  //   return async ()=>{
  //     const req = await fetch("/api/amazonProducts/search");
  //     const dataset = await req.json();

  //     console.log(dataset);
  //   }
  // }, []);

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
                <span className={classes["slider_item_link"]}></span>
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
                        <Image src={`/home_links_slider/${sliderLink}.jpg`} fill={true} style={{objectFit:"cover"}} alt={sliderLink} />
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
