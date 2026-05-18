import React from "react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

import classes from "@GlobalCompsStyles/Footer.module.scss";

import {languagesObj} from "@Lib/UIListsData";

const Footer = () => {
  const router = useRouter();

  const languageQuery = !languagesObj.availableLanguages.includes(router.query.language?.toLowerCase()) ? "en" : router.query.language?.toLowerCase();
  const activeLangObj = languagesObj.languages.find(lang => lang.langCode === languageQuery);

  console.log(activeLangObj)

  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes["page_footer--EL"]}>
      <div className={classes["footer_content--CONTAINER"]}>
        <h3
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvent: "none",
          }}
        > Footer </h3>

        <Link href="#" className={`${classes["footer_btt--BTN"]} md_font`}> back to top </Link>

        <div role="presentation" className={classes["footer_nav--EL"]}>
          <section className={classes["footer_nav_content--CONTAINER"]}>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4 className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`} > Get to Know Us </h4>
              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>careers</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>blog</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>about amazon</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Investor Relations</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>amazon devices</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>amazon science</Link>
                </li>
              </ol>
            </div>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4 className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`} > Make Money with Us </h4>

              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Sell products on Amazon</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Sell on Amazon Business</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Sell apps on Amazon</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Become an Affiliate</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Advertise Your Products</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Self-Publish with Us</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Host an Amazon Hub</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>See More Make Money with Us</Link>
                </li>
              </ol>
            </div>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4 className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`} >Amazon Payment Products</h4>
              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Amazon Business Card</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Shop with Points</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Reload Your Balance</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Amazon Currency Converter</Link>
                </li>
              </ol>
            </div>
            <div className={classes["footer_nav_link_column--BLOCK"]}>
              <h4 className={`${classes["footer_nav_link_column_title--EL"]} md_lg_font`} > Let Us Help You </h4>
              <ol className={classes["footer_nav_link--CONTAINER"]}>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Investor Relations</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Amazon and COVID-19</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>your account</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>your orders</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Shipping Rates & Policies</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Returns & Replacements</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Manage Your Content and Devices</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>Amazon Assistant</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_nav_link--EL"]} md_font`}>help</Link>
                </li>
              </ol>
            </div>
          </section>

          <hr />

          <div className={classes["footer_nav_config_line--EL"]}>
            <div className={classes["footer_nav_config_line_content--CONTAINER"]} >
              <Link href="/" className={classes["footer_nav_logo--EL"]}>
                <Image
                  src="/logos/amazon-[F]name.png"
                  fill={true} 
                  style={{objectFit:"contain"}} 
                  alt="amazon.com"
                />
              </Link>

              <div className={classes["amazon_config_links--WRAPPER"]}>
                <div className={classes["footer_language_link--WRAPPER"]}>
                  <Link
                    href="javascript:void(0)"
                    className={`${classes["amazon_config_link--EL"]} ${classes["amazon_language_link--EL"]}`}
                  >
                    <div className={ classes["amazon_config_link_content--CONTAINER"] } >
                      <span className={`${classes["amazon_config_link_icon--WRAPPER"]} ${classes["amazon_config_language_icon"]}`} ></span>
                      <span className={`${classes["amazon_config_link_text--EL"]} sm_font`} > English </span>
                      <span className={classes["amazon_config_dropdown_icon--EL"]} ></span>
                    </div>
                  </Link>
                  <div className={ classes[ "footer_amazon_language_config_dropdown--CONTAINER" ] } >
                    <div className={ classes["footer_amazon_language_config_dropdown--BLOCK"] } >
                      <div className={classes["lang_dropdown_content--CONTAINER"]} >
                        <div className={classes["lang_dropdown_header--CONTAINER"]} >
                          <span className="md_font">
                            <span className={classes["lang_dropdown_title--EL"]} > Change language </span>
                            <Link
                              href="/learnMore?ref=lang"
                              className={`${classes["lang_dropdown_secondary_link"]} xsm_font`}
                            > Learn more </Link>
                          </span>

                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  href="javascript:void(0)"
                  className={`${classes["amazon_config_link--EL"]} ${classes["amazon_language_link--EL"]}`}
                >
                  <div className={classes["amazon_config_link_content--CONTAINER"]} >
                    <span className={`${classes["amazon_config_link_icon--WRAPPER"]} ${classes["amazon_config_currency_icon"]} md_font`}>$</span>
                    <span className={`${classes["amazon_config_link_text--EL"]} sm_font`}>USD - U.S. Dollar</span>
                  </div>
                </Link>
                <Link href="javascript:void(0)" className={`${classes["amazon_config_link--EL"]} ${classes["amazon_language_link--EL"]}`}>
                  <div className={classes["amazon_config_link_content--CONTAINER"]}>
                    <span className={`${classes["amazon_config_link_icon--WRAPPER"]} ${classes["amazon_config_flag_icon"]}`}></span>
                    <span className={`${classes["amazon_config_link_text--EL"]} sm_font`}>united states</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <nav className={classes["footer_amazon_coppyright_line--EL"]}>
            <div className={classes["footer_amazon_coppyright_line_content--CONTAINER"]}>
              <ol className={classes["footer_amazon_copyright_list--EL"]}>
                <li>
                  <Link href="/" className={`${classes["footer_amazon_copyright_link--EL"]} md_font`}>Conditions of Use</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_amazon_copyright_link--EL"]} md_font`}>Privacy Notice</Link>
                </li>
                <li>
                  <Link href="/" className={`${classes["footer_amazon_copyright_link--EL"]} md_font`}>Interest-Based Ads</Link>
                </li>
                <li>
                  <span className="md_font">&copy; 1996-{currentYear}, Amazon.com, Inc. or its affiliates</span>
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