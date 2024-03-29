import React from "react";

import Link from "next/link";
import Image from "next/image";

import classes from "../../styles/Components/Global/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes["page_footer--EL"]}>
      <div className={classes["footer_content--CONTAINER"]}>
        <h3
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvent: "none",
          }}
        >
          Footer
        </h3>

        <Link href="#">
          <a className={`${classes["footer_btt--BTN"]} md_font`}>back to top</a>
        </Link>

        <div role="presentation" className={classes["footer_nav--EL"]}>
          <section className={classes["footer_nav_content--CONTAINER"]}>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4
                className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`}
              >
                Get to Know Us
              </h4>
              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      careers
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      blog
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      about amazon
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Investor Relations
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      amazon devices
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      amazon science
                    </a>
                  </Link>
                </li>
              </ol>
            </div>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4
                className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`}
              >
                Make Money with Us
              </h4>
              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Sell products on Amazon
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Sell on Amazon Business
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Sell apps on Amazon
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Become an Affiliate
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Advertise Your Products
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Self-Publish with Us
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Host an Amazon Hub
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      See More Make Money with Us
                    </a>
                  </Link>
                </li>
              </ol>
            </div>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4
                className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`}
              >
                Amazon Payment Products
              </h4>
              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Amazon Business Card
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Shop with Points
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Reload Your Balance
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Amazon Currency Converter
                    </a>
                  </Link>
                </li>
              </ol>
            </div>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4
                className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`}
              >
                Let Us Help You
              </h4>
              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Investor Relations
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Amazon and COVID-19
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      your account
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      your orders
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Shipping Rates & Policies
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Returns & Replacements
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Manage Your Content and Devices
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      Amazon Assistant
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className={`${classes["footer_nav_link--EL"]} md_font`}>
                      help
                    </a>
                  </Link>
                </li>
              </ol>
            </div>
          </section>

          <hr />

          <div className={classes["footer_nav_config_line--EL"]}>
            <div
              className={classes["footer_nav_config_line_content--CONTAINER"]}
            >
              <Link href="/">
                <a className={classes["footer_nav_logo--EL"]}>
                  <Image
                    src="/logos/amazon-[F]name.png"
                    layout="fill"
                    objectFit="contain"
                    alt="amazon.com"
                  />
                </a>
              </Link>

              <div className={classes["amazon_config_links--WRAPPER"]}>
                <div className={classes["footer_language_link--WRAPPER"]}>
                  <Link href="javascript:void(0)">
                    <a
                      className={`${classes["amazon_config_link--EL"]} ${classes["amazon_language_link--EL"]}`}
                    >
                      <div
                        className={
                          classes["amazon_config_link_content--CONTAINER"]
                        }
                      >
                        <span
                          className={`${classes["amazon_config_link_icon--WRAPPER"]} ${classes["amazon_config_language_icon"]}`}
                        ></span>
                        <span
                          className={`${classes["amazon_config_link_text--EL"]} sm_font`}
                        >
                          English
                        </span>

                        <span
                          className={classes["amazon_config_dropdown_icon--EL"]}
                        ></span>
                      </div>
                    </a>
                  </Link>
                  <div
                    className={
                      classes[
                        "footer_amazon_language_config_dropdown--CONTAINER"
                      ]
                    }
                  >
                    <div
                      className={
                        classes["footer_amazon_language_config_dropdown--BLOCK"]
                      }
                    >
                      <div
                        className={classes["lang_dropdown_content--CONTAINER"]}
                      >
                        <div
                          className={classes["lang_dropdown_header--CONTAINER"]}
                        >
                          <span className="md_font">
                            <span
                              className={classes["lang_dropdown_title--EL"]}
                            >
                              Change language
                            </span>
                            <Link href="/learnMore?ref=lang">
                              <a
                                className={`${classes["lang_dropdown_secondary_link"]} xsm_font`}
                              >
                                Learn more
                              </a>
                            </Link>
                          </span>

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
                            <li className={classes["lang_item--EL"]}>
                              <Link href="/?language=es">
                                <a className="md_font">
                                  <span
                                    className={classes["lang_checker--EL"]}
                                  ></span>{" "}
                                  español - ES
                                </a>
                              </Link>
                            </li>
                            <li className={classes["lang_item--EL"]}>
                              <Link href="/?language=ar">
                                <a className="md_font">
                                  <span
                                    className={classes["lang_checker--EL"]}
                                  ></span>{" "}
                                  العربية - AR
                                </a>
                              </Link>
                            </li>
                            <li className={classes["lang_item--EL"]}>
                              <Link href="/?language=de">
                                <a className="md_font">
                                  <span
                                    className={classes["lang_checker--EL"]}
                                  ></span>{" "}
                                  Deutsch - DE
                                </a>
                              </Link>
                            </li>
                            <li className={classes["lang_item--EL"]}>
                              <Link href="/?language=he">
                                <a className="md_font">
                                  <span
                                    className={classes["lang_checker--EL"]}
                                  ></span>{" "}
                                  עברית - HE
                                </a>
                              </Link>
                            </li>
                            <li className={classes["lang_item--EL"]}>
                              <Link href="/?language=ko">
                                <a className="md_font">
                                  <span
                                    className={classes["lang_checker--EL"]}
                                  ></span>{" "}
                                  한국어 - KO
                                </a>
                              </Link>
                            </li>
                            <li className={classes["lang_item--EL"]}>
                              <Link href="/?language=pt">
                                <a className="md_font">
                                  <span
                                    className={classes["lang_checker--EL"]}
                                  ></span>{" "}
                                  português - PT
                                </a>
                              </Link>
                            </li>
                            <li className={classes["lang_item--EL"]}>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="javascript:void(0)">
                  <a
                    className={`${classes["amazon_config_link--EL"]} ${classes["amazon_language_link--EL"]}`}
                  >
                    <div
                      className={
                        classes["amazon_config_link_content--CONTAINER"]
                      }
                    >
                      <span
                        className={`${classes["amazon_config_link_icon--WRAPPER"]} ${classes["amazon_config_currency_icon"]} md_font`}
                      >
                        $
                      </span>
                      <span
                        className={`${classes["amazon_config_link_text--EL"]} sm_font`}
                      >
                        USD - U.S. Dollar
                      </span>
                    </div>
                  </a>
                </Link>
                <Link href="javascript:void(0)">
                  <a
                    className={`${classes["amazon_config_link--EL"]} ${classes["amazon_language_link--EL"]}`}
                  >
                    <div
                      className={
                        classes["amazon_config_link_content--CONTAINER"]
                      }
                    >
                      <span
                        className={`${classes["amazon_config_link_icon--WRAPPER"]} ${classes["amazon_config_flag_icon"]}`}
                      ></span>
                      <span
                        className={`${classes["amazon_config_link_text--EL"]} sm_font`}
                      >
                        united states
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <nav className={classes["footer_amazon_coppyright_line--EL"]}>
            <div
              className={
                classes["footer_amazon_coppyright_line_content--CONTAINER"]
              }
            >
              <ol className={classes["footer_amazon_copyright_list--EL"]}>
                <li>
                  <Link href="/">
                    <a
                      className={`${classes["footer_amazon_copyright_link--EL"]} md_font`}
                    >
                      Conditions of Use
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a
                      className={`${classes["footer_amazon_copyright_link--EL"]} md_font`}
                    >
                      Privacy Notice
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a
                      className={`${classes["footer_amazon_copyright_link--EL"]} md_font`}
                    >
                      Interest-Based Ads
                    </a>
                  </Link>
                </li>

                <li>
                  <span className="md_font">
                    &copy; 1996-2022, Amazon.com, Inc. or its affiliates
                  </span>
                </li>
              </ol>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
