import React, { Fragment, useState, useEffect, useContext } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "@Lib/FirebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { UserCartContext } from "@CustomContext/CartCtx";

import Main_layout from "../Layout/Main_layout";

import Hmenu from "./Hmenu";
import MenuOverlay from "./MenuOverlay";

import classes from "@GlobalCompsStyles/Navbar.module.scss";
import { open_hmenu } from "@GlobalCompsStyles/Hmenu.module.scss";

import {languagesObj} from "@Lib/UIListsData";

const Navbar = () => {
  const { currentUser } = auth;
  const router = useRouter();

  const {
    cleanUserCartStorage__HANDLER,
    userCartFromDB__HANDLER,
    userCartFromLS__HANDLER,
    userCartLength,
  } = useContext(UserCartContext);


  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  const languageQuery = !languagesObj.availableLanguages.includes(router.query.language?.toLowerCase()) ? "en" : router.query.language?.toLowerCase();

  const open_hmenu__FUNC = (evt) => {
    evt.preventDefault();

    const hmenu__EL = document.getElementById("hmenu--BLOCK");
    hmenu__EL.classList.add(open_hmenu);
    document.body.style.overflow = "hidden";
  };

  const show_dropdown_overlay__FUNC = () => setOverlayIsVisible(true);
  const hide_dropdown_overlay__FUNC = () => setOverlayIsVisible(false);

  const submitProductsSearchKeyword__HANDLER = (evt) => {
    evt.preventDefault();

    const searchKeyword = evt.target.keyword.value;

    if (!!searchKeyword) {
      router.push(`/search?k=${searchKeyword}`);
      console.log(`/search?k=${searchKeyword}`);
    }
  };

  const navbarSignOutClick__EventHandler = () => {
    signOut(auth).then(() => {
      cleanUserCartStorage__HANDLER();
      router.push("/signin");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userCartFromDB__HANDLER(user.uid);
      } else {
        userCartFromLS__HANDLER();
      }
    });
  }, [userCartFromDB__HANDLER, userCartFromLS__HANDLER]);

  return (
    <Fragment>
      <header className={`${classes["navbar--El"]} ${classes["big_screens--NAVBAR"]}`} >
        <nav className={classes["navbar_main--BLOCK"]}>
          <Main_layout>
            <div className={classes["navbar_main_content--CONTAINER"]}>
              <Link className={`navbar_link_hover_border ${classes["navbar_link--EL"]} ${classes["navbar_logo--El"]}`} href="/">
                <span className={classes["navbar_logo--CONTAINER"]}>
                  <Image
                    src="/logos/amazon-[F]name.png"
                    fill={true}
                    style={{objectFit:"contain", objectPosition:"center"}}
                    role="logo"
                    alt="amazon"
                  />
                </span>
              </Link>

              <Link className={`navbar_link_hover_border  ${classes["navbar_link--EL"]} ${classes["navbar_deliving_location_link--El"]}`} href="javascript:void(0)">
                <i className={classes["deliving_location--ICON"]}></i>
                <div className={`nav_main_font ${classes["deliving_location--CONTAINER"]}`} >
                  <span className={`${classes["nav_link_eyebrow--EL"]} ${classes["deliving_location_eyebrow--EL"]} xsm_font`} > Deliver To </span>
                  <span className={`${classes["nav_link_main--EL"]} md_lg_font ${classes["deliving_location--EL"]}`} > Morocco </span>
                </div>
              </Link>

              <div className={classes["nav_search--CONTAINER"]}>
                <div className={classes["nav_search_dropdown--CONTAINER"]}>
                  <div className={classes["nav_search_dropdown_frontend--EL"]}>
                    <span className={`${classes["nav_search_dropdown_selected--EL"]} md_font`} > All </span>
                    <span className="nav_dropdown_icon">
                      <Image
                        src="/icons/arrow_down.png"
                        fill={true}
                        style={{objectFit:"contain"}}
                        alt="arrow down"
                      />
                    </span>
                  </div>

                  <select name="All" id="All" tabIndex="2">
                    <option value="All">All</option>
                    <option value="arts & crafts">arts & crafts</option>
                    <option value="automotive">automotive</option>
                    <option value="tools & home improvements">tools & home improvements</option>
                  </select>
                </div>
                <div className={classes["nav_search_input--CONTAINER"]}>
                  <form onSubmit={submitProductsSearchKeyword__HANDLER} className={classes["nav_search_form--EL"]} >
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      placeholder={router.query.k ? router.query.k : ""}
                      className={classes["nav_search_input"]}
                    />
                    <button type="submit" className={classes["nav_search_btn"]}>
                      <Image src="/icons/search.png" width={32} height={32} alt="search"/>
                    </button>
                  </form>
                </div>
              </div>

              <div
                className={`${classes["nav_link--WRAPPER"]} ${classes["nav_languages--BLOCK"]}`}
                onMouseEnter={show_dropdown_overlay__FUNC}
                onMouseLeave={hide_dropdown_overlay__FUNC}
              >
                <Link className={`navbar_link_hover_border  ${classes["navbar_link--EL"]} ${classes["nav_languages_link--EL"]}`} href="javascript:void(0)">
                  <div className={classes["nav_languages_link_frontend--EL"]}>
                    <span className={classes["nav_lang_flag--CONTAINER"]} ></span>
                    <span className="nav_dropdown_icon">
                      <Image
                        className="filter_img_toWhite"
                        src="/icons/arrow_down.png"
                        fill={true}
                        style={{objectFit:"contain"}}
                        alt="arrow down"
                      />
                    </span>
                  </div>
                </Link>

                <div className={`${classes["nav_dropdown--EL"]} ${classes["nav_lang_dropdown--EL"]}`} >
                  <div className={classes["nav_lang_dropdown_content--CONTAINER"]} >
                    <div className={classes["nav_lang_dropdown_header--CONTAINER"]} >
                      <span className={`sm_font`}>
                        <span className={`${classes["nav_lang_dropdown_title--EL"]}`} > Change language </span>
                        <Link className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`} href="javascript:void(0)">Learn more</Link>
                      </span>

                      <ul className={classes["languages_list--EL"]}>
                        {languagesObj.languages.map(lang => (
                          <li key={lang.langCode} className={`${classes["lang_item--EL"]} ${lang.langCode === languageQuery && classes["active_lang_item"]}`} >
                            <Link className="md_font" href={`/?language=${lang.langCode}`}>
                              <span className={classes["lang_checker--EL"]} ></span>{" "}
                                {lang.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <div className={classes["nav_dropdown_currency--BLOCK"]}>
                        <div className="md_font">
                          <span className={classes["nav_lang_dropdown_title--EL"]} > Change currency </span>
                          <Link className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`} href="javascript:void(0)">Learn more</Link>
                        </div>
                        <div className={classes["currency_change--EL"]}>
                          <span className={classes["currency--El"]}> $ - USD - US Dollar </span>
                          <Link className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`} href="javascript:void(0)">Change</Link>
                        </div>
                      </div>
                      <hr />
                      <div className={classes["nav_dropdown--FOOTER"]}>
                        <div className={ classes["nav_dropdown_footer_content--CONTAINER"] } >
                          <span className={ classes["nav_dropdown_footer_header--EL"] } >
                          <span className={ classes["nav_dropdown_footer_flag--WRAPPER"] } ></span>{" "} You are shopping on Amazon.com </span>

                          <Link className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`} href="javascript:void(0)">Change country/region.</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${classes["nav_link--WRAPPER"]} ${classes["nav_account--BLOCK"]}`}
                onMouseEnter={show_dropdown_overlay__FUNC}
                onMouseLeave={hide_dropdown_overlay__FUNC}
              >
                <Link className={`navbar_link_hover_border  ${classes["navbar_link--EL"]} ${classes["nav_account_link--EL"]}`} href="javascript:void(0)">
                  <div className={classes["nav_account_link_frontend--EL"]}>
                    <span className={`${classes["nav_link_eyebrow--EL"]} ${classes["account_eyebrow--EL"]} xsm_font`} >
                      Hello,{" "}
                      {!!currentUser ? currentUser.displayName : "random human"}
                    </span>
                    <span className={`${classes["nav_link_main--EL"]} md_lg_font`} > account & lists </span>
                  </div>
                  <span className={`nav_dropdown_icon ${classes["nav_account_dropdown_icon"]}`} >
                    <Image
                      className="filter_img_toWhite"
                      src="/icons/arrow_down.png"
                      fill={true}
                      style={{objectFit:"contain"}}
                      alt="arrow down"
                    />
                  </span>
                </Link>

                <div className={`${classes["nav_dropdown--EL"]} ${classes["nav_account_dropdown--EL"]}`} >
                  <div className={ classes["nav_account_dropdown_content--CONTAINER"] } >
                    {!currentUser && (
                      <div className={classes["nav_signup_ctas--BLOCK"]}>
                        <div className={ classes["nav_signup_ctas_content--WRAPPER"] } >
                          <Link className={`${classes["signin_link--EL"]} md_font`} href="/signin">sign in</Link>
                          <span className={`${classes["register_link--EL"]} sm_font`} >
                            New customer?{" "}
                            <Link className={classes["register--LINK"]} href="/register">start here.</Link>
                          </span>
                        </div>

                        <hr />
                      </div>
                    )}

                    <div className={classes["nav_account_dropdown_links--BLOCK"]} >
                      <div className={classes["nav_account_dropdown_list--BLOCK"]} >
                        <span className={`${classes["nav_account_dropdown_title--EL"]} md_lg_font`} > Your Lists </span>
                        <ul className={`${classes["nav_account_dropdown_linksList--EL"]} md_font`} >
                          <li>
                            <Link href="javascript:void(0)">Create a List</Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)"> find a list or registry </Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)"> amazonSmile charity list </Link>
                          </li>
                        </ul>
                      </div>
                      <div className={ classes["nav_account_dropdown_account--BLOCK"] } >
                        <span className={`${classes["nav_account_dropdown_title--EL"]} md_lg_font`} > Your accounts </span>
                        <ul className={`${classes["nav_account_dropdown_linksList--EL"]} md_font`} >
                          <li>
                            <Link href="javascript:void(0)">accounts</Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)">order</Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)"> Recommendations </Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)"> Browsing History </Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)">Watchlist</Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)"> Video Purchases & Rentals </Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)"> Kindle Unlimited </Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)">Content & Devices</Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)">Subscribe & Save Items</Link>
                          </li>
                          <li>
                            <Link href="javascript:void(0)">Memberships & Subscriptions</Link>
                          </li>
                          {currentUser && (
                            <Fragment>
                              <li>
                                <Link href="javascript:void(0)">Switch Accounts</Link>
                              </li>
                              <li>
                                <Link onClick={navbarSignOutClick__EventHandler} href="javascript:void(0)">Sign Out</Link>
                              </li>
                            </Fragment>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link className={`navbar_link_hover_border ${classes["navbar_link--EL"]} ${classes["nav_returnsANDorders_link--EL"]}`} href="javascript:void(0)">
               <div className={ classes["nav_returnsANDorders_link_frontend--EL"] } >
                  <span className={`${classes["nav_link_eyebrow--EL"]} xsm_font`} > returns & </span>
                  <span className={`${classes["nav_link_main--EL"]} md_lg_font`} > orders </span>
                </div>
              </Link>

              <Link className={`navbar_link_hover_border ${classes["navbar_link--EL"]} ${classes["nav_cart_link--EL"]}`} href="javascript:void(0)">
                <div className={ classes["nav_returnsANDorders_link_frontend--EL"] }>
                  <div className={classes["cart_items_length--BLOCK"]}>
                    <span className={classes["cart_icon--EL"]}></span>
                    <span className={`${classes["cart_items_length"]} md_lg_font`} > {userCartLength} </span>
                  </div>
                  <span className={`${classes["nav_link_main--EL"]} md_lg_font`} > cart </span>
                </div>
              </Link>
            </div>
          </Main_layout>
        </nav>

        <nav className={classes["navbar_belt--BLOCK"]}>
          <Main_layout>
            <div className={classes["navbar_belt_content--CONTAINER"]}>
              <ul className={classes["nav_links_list--EL"]}>
                <li>
                  <Link 
                    className="navbar_link_hover_border md_font"
                    onClick={open_hmenu__FUNC} 
                    href="javascript:void(0)"
                  >
                    <span className={classes["nav_menu_icon"]}></span> All
                  </Link>
                </li>
                <li>
                  <Link className="navbar_link_hover_border md_font" href="javascript:void(0)">Today{"'"}s Deals</Link>
                </li>
                <li>
                  <Link className="navbar_link_hover_border md_font" href="javascript:void(0)">Buy Again</Link>
                </li>
                <li>
                  <Link
                    className="navbar_link_hover_border md_font"
                    href="javascript:void(0)"
                  >Customer Service</Link>
                </li>
                <li
                  className={classes["browsingHistory--EL"]}
                  onMouseEnter={show_dropdown_overlay__FUNC}
                  onMouseLeave={hide_dropdown_overlay__FUNC}
                >
                  <Link className="navbar_link_hover_border md_font" href="javascript:void(0)">
                      <div className={classes["browsingHistory_link_frontend--EL"]} >
                        <span className={classes["browsingHistory_link_text--EL"]}  > Browsing History</span>
                        <span className={`nav_dropdown_icon ${classes["browsingHistory_link_dropdown_icon"]}`} >
                          <Image
                            className="filter_img_toWhite"
                            src="/icons/arrow_down.png"
                            fill={true}
                            style={{objectFit:"contain"}}
                            alt="arrow down"
                          />
                        </span>
                      </div>
                  </Link>

                  <article className={classes["browsingHistory_dropdown--EL"]}>
                    <div className={ classes["browsingHistory_dropdown_content--EL"] } >
                      <span className={`${classes["browsingHistory_dropdown_header--EL"]} md_font`} >
                        <h4 className={`${classes["browsingHistory_dropdown_title--EL"]}`} > Your Browsing History </h4>
                        <Link className="sm_font" href="javascript:void(0)">View and Edit</Link>
                      </span>
                      <div className={classes["browsingHistory_dropdown_main--EL"]} >
                        <span className={`${classes["empty_browsingHistory_title"]} lg_font`} > browsing history feature is currently unavailable </span>

                        {/* <h4
                          className={`${classes["empty_browsingHistory_title"]} lg_font`}
                        >
                          Your shopping history is empty
                        </h4>
                        <span className="sm_font">
                          Check back here to see items you shop for on any
                          device.
                        </span> */}
                      </div>
                    </div>
                  </article>
                </li>
                <li>
                  <Link className="navbar_link_hover_border md_font" href="javascript:void(0)">Gift Cards</Link>
                </li>
                <li>
                  <Link className="navbar_link_hover_border md_font" href="javascript:void(0)">Registry</Link>
                </li>
                <li>
                  <Link className="navbar_link_hover_border md_font" href="javascript:void(0)">Sell</Link>
                </li>
              </ul>

              <Link className="navbar_link_hover_border md_font" href="javascript:void(0)">Shop Fathers Day Gifts</Link>
            </div>
          </Main_layout>
        </nav>
      </header>

      <nav className={`${classes["navbar--El"]} ${classes["mobile_screens--NAVBAR"]}`} >
        <Main_layout>
          <div className={classes["navbar_eyebrow--BLOCK"]}>
            <div className={classes["navbar_eyebrow_leftSide_content--WRAPPER"]} >
              <Link 
                className="navbar_link_hover_border"
                onClick={open_hmenu__FUNC} 
                href="javascript:void(0)"
              >
                <i className={classes["nav_menu_icon"]}></i>
              </Link>

              <Link className={`${classes["navbar_link--EL"]} ${classes["navbar_logo--EL"]}`} href="/">
                <span className={classes["navbar_logo--CONTAINER"]}>
                  <Image
                    src="/logos/amazon-[F]name.png"
                    fill={true}
                    style={{objectFit:"contain", objectPosition:"center"}}
                    alt="amazon"
                  />
                </span>
              </Link>
            </div>

            <div className={classes["navbar_eyebrow_rightSide_content--WRAPPER"]} >
              {currentUser ? (
                <Link className={`${classes["navbar_account--LINK"]}`} href="javascript:void(0)">
                  <div className={classes["navbar_account_linkContent--WRAPPER"]} >
                    <span className={`${classes["navbar_account--TYPOS"]} xlg_font`} >
                      {currentUser.displayName}{" "}
                      <i className={classes["right_arror--ICON"]}></i>
                    </span>
                    <i className={classes["user_account--ICON"]}></i>
                  </div>
                </Link>
              ) : (
                <Link className={`${classes["navbar_account--LINK"]}`} href="/signin">
                  <div className={classes["navbar_account_linkContent--WRAPPER"]} >
                    <span className={`${classes["navbar_account--TYPOS"]} xlg_font`} >
                      Sign-In <i className={classes["right_arror--ICON"]}></i>
                    </span>
                    <i className={classes["user_account--ICON"]}></i>
                  </div>
                </Link>
              )}

              <Link className={`navbar_link_hover_border ${classes["navbar_link--EL"]} ${classes["nav_cart_link--EL"]}`} href="javascript:void(0)">
                <div className={classes["cart_items_length--BLOCK"]}>
                  <i className={classes["cart--ICON"]}></i>
                  <span className={`${classes["cart_items_length"]} lg_font`}>{userCartLength}</span>
                </div>
              </Link>
            </div>
          </div>
          <div className={classes["navbar_search_form--WRAPPER"]}>
            <form onSubmit={submitProductsSearchKeyword__HANDLER} className={classes["nav_search_form--EL"]} >
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder={router.query.k ? router.query.k : "Search Amazon"}
                className={`${classes["nav_search_input"]} xlg_font`}
              />
              <button type="submit" className={classes["nav_search_btn"]}>
                <Image
                  src="/icons/search.png"
                  width={32}
                  height={32}
                  alt="search"
                />
              </button>
            </form>
          </div>

          <div className={classes["navbar_nose--BLOCK"]}>
            <div className={classes["navbar_categories_list--WRAPPER"]}>
              <ul className={classes["navbar_categories--LIST"]}>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("pc")}`}>pc</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("health and household")}`}>health and household</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("pets")}`}>pets</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("pharmacy")}`}>pharmacy</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("home decos")}`}>home decos</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("books")}`}>books</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("toys & games")}`}>toys & games</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("fitness")}`}>fitness</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("automotive")}`}>automotive</Link>
                </li>
                <li>
                  <Link className={`${classes["navbar_category--LINK"]} lg_font`} href={`/search?k=${encodeURI("headphones")}`}>headphones</Link>
                </li>
              </ul>
            </div>
          </div>
        </Main_layout>
      </nav>

      {/* Floating Components */}
      <Hmenu />
      <MenuOverlay active_overlay={overlayIsVisible} />
      {/* //////////////////////////////////////// */}
    </Fragment>
  );
};

export default Navbar;
