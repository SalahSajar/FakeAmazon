import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "../../lib/FirebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { UserCartContext } from "../../customContexts/CartCtx";

import Main_layout from "../Layout/Main_layout";

import Hmenu from "./Hmenu";
import MenuOverlay from "./MenuOverlay";

import classes from "../../styles/Components/Global/Navbar.module.scss";
import { open_hmenu } from "../../styles/Components/Global/Hmenu.module.scss";

const Navbar = () => {
  const {
    cleanUserCartStorage__HANDLER,
    userCartFromDB__HANDLER,
    userCartFromSS__HANDLER,
    userCartLength,
  } = useContext(UserCartContext);
  const { currentUser } = auth;

  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  const router = useRouter();

  const open_hmenu__FUNC = (evt) => {
    evt.preventDefault();

    const hmenu__EL = document.getElementById("hmenu--BLOCK");
    hmenu__EL.classList.add(open_hmenu);
  };

  const show_dropdown_overlay__FUNC = () => setOverlayIsVisible(true);
  const hide_dropdown_overlay__FUNC = () => setOverlayIsVisible(false);

  const submitProductsSearchKeyword__HANDLER = (evt) => {
    evt.preventDefault();

    const searchKeyword = evt.target.keyword.value;

    if (!!searchKeyword) {
      router.replace(`/search?k=${searchKeyword}`);
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
        console.log(user);
        userCartFromDB__HANDLER(user.uid);
      } else {
        userCartFromSS__HANDLER();
      }
    });

    console.log("--------Load from Storage");
  }, [userCartFromDB__HANDLER, userCartFromSS__HANDLER]);

  return (
    <Fragment>
      <nav className={classes["navbar--El"]}>
        <div className={classes["navbar_main--BLOCK"]}>
          <Main_layout>
            <div className={classes["navbar_main_content--CONTAINER"]}>
              <Link href="/">
                <a
                  className={`navbar_link_hover_border ${classes["navbar_link--EL"]} ${classes["navbar_logo--El"]}`}
                >
                  <span className={classes["navbar_logo--CONTAINER"]}>
                    <Image
                      src="/logos/amazon-[F]name.png"
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                      alt="amazon"
                    />
                  </span>
                </a>
              </Link>

              <Link href="/">
                <a
                  className={`navbar_link_hover_border  ${classes["navbar_link--EL"]} ${classes["navbar_deliving_location_link--El"]}`}
                >
                  <i className={classes["deliving_location--ICON"]}></i>
                  <div
                    className={`nav_main_font ${classes["deliving_location--CONTAINER"]}`}
                  >
                    <span
                      className={`${classes["nav_link_eyebrow--EL"]} ${classes["deliving_location_eyebrow--EL"]} xsm_font`}
                    >
                      Deliver To
                    </span>
                    <span
                      className={`${classes["nav_link_main--EL"]} md_lg_font ${classes["deliving_location--EL"]}`}
                    >
                      Morocco
                    </span>
                  </div>
                </a>
              </Link>

              <div className={classes["nav_search--CONTAINER"]}>
                <div className={classes["nav_search_dropdown--CONTAINER"]}>
                  <div className={classes["nav_search_dropdown_frontend--EL"]}>
                    <span
                      className={`${classes["nav_search_dropdown_selected--EL"]} md_font`}
                    >
                      All
                    </span>
                    <span className="nav_dropdown_icon">
                      <Image
                        src="/icons/arrow_down.png"
                        layout="fill"
                        objectFit="contain"
                        alt="arrow down"
                      />
                    </span>
                  </div>

                  <select name="All" id="All" tabIndex="2">
                    <option value="All">All</option>
                    <option value="arts & crafts">arts & crafts</option>
                    <option value="automotive">automotive</option>
                    <option value="tools & home improvements">
                      tools & home improvements
                    </option>
                  </select>
                </div>
                <div className={classes["nav_search_input--CONTAINER"]}>
                  <form
                    onSubmit={submitProductsSearchKeyword__HANDLER}
                    className={classes["nav_search_form--EL"]}
                  >
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      placeholder={router.query.k ? router.query.k : ""}
                      className={classes["nav_search_input"]}
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
              </div>

              <div
                className={`${classes["nav_link--WRAPPER"]} ${classes["nav_languages--BLOCK"]}`}
                onMouseEnter={show_dropdown_overlay__FUNC}
                onMouseLeave={hide_dropdown_overlay__FUNC}
              >
                <Link href="javascript:void(0)">
                  <a
                    className={`navbar_link_hover_border  ${classes["navbar_link--EL"]} ${classes["nav_languages_link--EL"]}`}
                  >
                    <div className={classes["nav_languages_link_frontend--EL"]}>
                      <span
                        className={classes["nav_lang_flag--CONTAINER"]}
                      ></span>
                      <span className="nav_dropdown_icon">
                        <Image
                          className="filter_img_toWhite"
                          src="/icons/arrow_down.png"
                          layout="fill"
                          objectFit="contain"
                          alt="arrow down"
                        />
                      </span>
                    </div>
                  </a>
                </Link>

                <div
                  className={`${classes["nav_dropdown--EL"]} ${classes["nav_lang_dropdown--EL"]}`}
                >
                  <div
                    className={classes["nav_lang_dropdown_content--CONTAINER"]}
                  >
                    <div
                      className={classes["nav_lang_dropdown_header--CONTAINER"]}
                    >
                      <h4 className={`sm_font`}>
                        <span
                          className={`${classes["nav_lang_dropdown_title--EL"]}`}
                        >
                          Change language
                        </span>
                        <Link href="/learnMore?ref=lang">
                          <a
                            className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`}
                          >
                            Learn more
                          </a>
                        </Link>
                      </h4>

                      <ul className={classes["languages_list--EL"]}>
                        <li
                          className={`${classes["lang_item--EL"]} ${classes["active_lang_item"]}`}
                        >
                          <Link href="/?language=en">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              English - EN
                            </a>
                          </Link>
                        </li>
                        <hr />
                        <li className={`${classes["lang_item--EL"]}`}>
                          <Link href="/?language=es">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              español - ES
                            </a>
                          </Link>
                        </li>
                        <li className={`${classes["lang_item--EL"]}`}>
                          <Link href="/?language=ar">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              العربية - AR
                            </a>
                          </Link>
                        </li>
                        <li className={`${classes["lang_item--EL"]}`}>
                          <Link href="/?language=de">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              Deutsch - DE
                            </a>
                          </Link>
                        </li>
                        <li className={`${classes["lang_item--EL"]}`}>
                          <Link href="/?language=he">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              עברית - HE
                            </a>
                          </Link>
                        </li>
                        <li className={`${classes["lang_item--EL"]}`}>
                          <Link href="/?language=ko">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              한국어 - KO
                            </a>
                          </Link>
                        </li>
                        <li className={`${classes["lang_item--EL"]}`}>
                          <Link href="/?language=pt">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              português - PT
                            </a>
                          </Link>
                        </li>
                        <li className={`${classes["lang_item--EL"]}`}>
                          <Link href="/?language=zh">
                            <a className="md_font">
                              <span
                                className={classes["lang_checker--EL"]}
                              ></span>{" "}
                              中文 (简体) - ZH
                            </a>
                          </Link>
                        </li>
                      </ul>
                      <hr />
                      <div className={classes["nav_dropdown_currency--BLOCK"]}>
                        <h4 className="md_font">
                          <span
                            className={classes["nav_lang_dropdown_title--EL"]}
                          >
                            Change currency
                          </span>
                          <Link href="/learnMore?ref=currency">
                            <a
                              className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`}
                            >
                              Learn more
                            </a>
                          </Link>
                        </h4>
                        <div className={classes["currency_change--EL"]}>
                          <span className={classes["currency--El"]}>
                            $ - USD - US Dollar
                          </span>
                          <Link href="/customer-prefrence/edit?ref=currency">
                            <a
                              className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`}
                            >
                              Change
                            </a>
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <div className={classes["nav_dropdown--FOOTER"]}>
                        <div
                          className={
                            classes["nav_dropdown_footer_content--CONTAINER"]
                          }
                        >
                          <h4>
                            <span
                              className={
                                classes["nav_dropdown_footer_flag--WRAPPER"]
                              }
                            ></span>{" "}
                            You are shopping on Amazon.com
                          </h4>
                          <Link href="/customer-prefrence/edit=country-region">
                            <a
                              className={`${classes["nav_lang_dropdown_secondary_link"]} xsm_font`}
                            >
                              Change country/region.
                            </a>
                          </Link>
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
                <Link href="javascript:void(0)">
                  <a
                    className={`navbar_link_hover_border  ${classes["navbar_link--EL"]} ${classes["nav_account_link--EL"]}`}
                  >
                    <div className={classes["nav_account_link_frontend--EL"]}>
                      <span
                        className={`${classes["nav_link_eyebrow--EL"]} ${classes["account_eyebrow--EL"]} xsm_font`}
                      >
                        Hello,{" "}
                        {!!currentUser
                          ? currentUser.displayName
                          : "random human"}
                      </span>
                      <span
                        className={`${classes["nav_link_main--EL"]} md_lg_font`}
                      >
                        account & lists
                      </span>
                    </div>
                    <span
                      className={`nav_dropdown_icon ${classes["nav_account_dropdown_icon"]}`}
                    >
                      <Image
                        className="filter_img_toWhite"
                        src="/icons/arrow_down.png"
                        layout="fill"
                        objectFit="contain"
                        alt="arrow down"
                      />
                    </span>
                  </a>
                </Link>

                <div
                  className={`${classes["nav_dropdown--EL"]} ${classes["nav_account_dropdown--EL"]}`}
                >
                  <div
                    className={
                      classes["nav_account_dropdown_content--CONTAINER"]
                    }
                  >
                    {!currentUser && (
                      <div className={classes["nav_signup_ctas--BLOCK"]}>
                        <div
                          className={
                            classes["nav_signup_ctas_content--WRAPPER"]
                          }
                        >
                          <Link href="/signin">
                            <a
                              className={`${classes["signin_link--EL"]} md_font`}
                            >
                              {" "}
                              sign in
                            </a>
                          </Link>
                          <span
                            className={`${classes["register_link--EL"]} sm_font`}
                          >
                            New customer?{" "}
                            <Link href="/register">
                              <a className={classes["register--LINK"]}>
                                start here.
                              </a>
                            </Link>
                          </span>
                        </div>

                        <hr />
                      </div>
                    )}

                    <div
                      className={classes["nav_account_dropdown_links--BLOCK"]}
                    >
                      <div
                        className={classes["nav_account_dropdown_list--BLOCK"]}
                      >
                        <h5
                          className={`${classes["nav_account_dropdown_title--EL"]} md_lg_font`}
                        >
                          Your Lists
                        </h5>
                        <ul
                          className={`${classes["nav_account_dropdown_linksList--EL"]} md_font`}
                        >
                          <li>
                            <Link href="/wishlist">Create a List</Link>
                          </li>
                          <li>
                            <Link href="/registries">
                              find a list or registry
                            </Link>
                          </li>
                          <li>
                            <Link href="/amazonSmile">
                              amazonSmile charity list
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={
                          classes["nav_account_dropdown_account--BLOCK"]
                        }
                      >
                        <h5
                          className={`${classes["nav_account_dropdown_title--EL"]} md_lg_font`}
                        >
                          Your accounts
                        </h5>
                        <ul
                          className={`${classes["nav_account_dropdown_linksList--EL"]} md_font`}
                        >
                          <li>
                            <Link href="/account">accounts</Link>
                          </li>
                          <li>
                            <Link href="/orders">order</Link>
                          </li>
                          <li>
                            <Link href="/Recommendations">Recommendations</Link>
                          </li>
                          <li>
                            <Link href="/browsingHistory">
                              Browsing History
                            </Link>
                          </li>
                          <li>
                            <Link href="/video/watchlist">Watchlist</Link>
                          </li>
                          <li>
                            <Link href="/video/library">
                              Video Purchases & Rentals
                            </Link>
                          </li>
                          <li>
                            <Link href="/kindle">Kindle Unlimited</Link>
                          </li>
                          <li>
                            <Link href="/mycd">Content & Devices</Link>
                          </li>
                          <li>
                            <Link href="/subscribe-and-save">
                              Subscribe & Save Items
                            </Link>
                          </li>
                          <li>
                            <Link href="/yourMenmbershipsAndSubscriptions">
                              Memberships & Subscriptions
                            </Link>
                          </li>
                          {currentUser && (
                            <Fragment>
                              <li>
                                <Link href="/switchAccounts">
                                  Switch Accounts
                                </Link>
                              </li>
                              <li>
                                <Link href="javascript:void(0)">
                                  <a onClick={navbarSignOutClick__EventHandler}>
                                    Sign Out
                                  </a>
                                </Link>
                              </li>
                            </Fragment>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/orders">
                <a
                  className={`navbar_link_hover_border ${classes["navbar_link--EL"]} ${classes["nav_returnsANDorders_link--EL"]}`}
                >
                  <div
                    className={
                      classes["nav_returnsANDorders_link_frontend--EL"]
                    }
                  >
                    <span
                      className={`${classes["nav_link_eyebrow--EL"]} xsm_font`}
                    >
                      returns &
                    </span>
                    <span
                      className={`${classes["nav_link_main--EL"]} md_lg_font`}
                    >
                      orders
                    </span>
                  </div>
                </a>
              </Link>

              <Link href="/cart">
                <a
                  className={`navbar_link_hover_border ${classes["navbar_link--EL"]} ${classes["nav_cart_link--EL"]}`}
                >
                  <div
                    className={
                      classes["nav_returnsANDorders_link_frontend--EL"]
                    }
                  >
                    <div className={classes["cart_items_length--BLOCK"]}>
                      <span className={classes["cart_icon--EL"]}></span>
                      <span
                        className={`${classes["cart_items_length"]} md_lg_font`}
                      >
                        {userCartLength}
                      </span>
                    </div>
                    <span
                      className={`${classes["nav_link_main--EL"]} md_lg_font`}
                    >
                      cart
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </Main_layout>
        </div>

        <div className={classes["navbar_belt--BLOCK"]}>
          <Main_layout>
            <div className={classes["navbar_belt_content--CONTAINER"]}>
              <ul className={classes["nav_links_list--EL"]}>
                <li>
                  <Link href="/menu">
                    <a
                      className="navbar_link_hover_border md_font"
                      onClick={open_hmenu__FUNC}
                    >
                      <span className={classes["nav_menu_icon"]}></span>
                      All
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/goldbox">
                    <a className="navbar_link_hover_border md_font">
                      Today{"'"}s Deals
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/buyagain">
                    <a className="navbar_link_hover_border md_font">
                      Buy Again
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    className="navbar_link_hover_border md_font"
                    href="/help/cumtomer"
                  >
                    <a className="navbar_link_hover_border md_font">
                      Customer Service
                    </a>
                  </Link>
                </li>
                <li
                  className={classes["browsingHistory--EL"]}
                  onMouseEnter={show_dropdown_overlay__FUNC}
                  onMouseLeave={hide_dropdown_overlay__FUNC}
                >
                  <Link href="/history">
                    <a className="navbar_link_hover_border md_font">
                      <div
                        className={classes["browsingHistory_link_frontend--EL"]}
                      >
                        <span
                          className={classes["browsingHistory_link_text--EL"]}
                        >
                          Browsing History
                        </span>
                        <span
                          className={`nav_dropdown_icon ${classes["browsingHistory_link_dropdown_icon"]}`}
                        >
                          <Image
                            className="filter_img_toWhite"
                            src="/icons/arrow_down.png"
                            layout="fill"
                            objectFit="contain"
                            alt="arrow down"
                          />
                        </span>
                      </div>
                    </a>
                  </Link>

                  <div className={classes["browsingHistory_dropdown--EL"]}>
                    <div
                      className={
                        classes["browsingHistory_dropdown_content--EL"]
                      }
                    >
                      <span
                        className={`${classes["browsingHistory_dropdown_header--EL"]} md_font`}
                      >
                        Your Browsing History{" "}
                        <Link href="/">
                          <a className="sm_font">View and Edit</a>
                        </Link>
                      </span>
                      <div
                        className={classes["browsingHistory_dropdown_main--EL"]}
                      >
                        <h4
                          className={`${classes["empty_browsingHistory_title"]} lg_font`}
                        >
                          browsing history feature is currently unavailable
                        </h4>

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
                  </div>
                </li>
                <li>
                  <Link href="/gift-cards">
                    <a className="navbar_link_hover_border md_font">
                      Gift Cards
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/registries">
                    <a className="navbar_link_hover_border md_font">Registry</a>
                  </Link>
                </li>
                <li>
                  <Link href="/sell">
                    <a className="navbar_link_hover_border md_font">Sell</a>
                  </Link>
                </li>
              </ul>

              <Link href="/">
                <a className="navbar_link_hover_border md_font">
                  {" "}
                  Shop Fathers Day Gifts
                </a>
              </Link>
            </div>
          </Main_layout>
        </div>
      </nav>

      {/* Floating Components */}
      <Hmenu />
      <MenuOverlay active_overlay={overlayIsVisible} />
      {/* //////////////////////////////////////// */}
    </Fragment>
  );
};

export default Navbar;
