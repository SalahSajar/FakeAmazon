import React, { useRef } from "react";
import Link from "next/link";

import { auth } from "@Lib/FirebaseConfig";

import Image from "next/image";

import classes from "@GlobalCompsStyles/UserSignup_layout.module.scss";

const UserSignup_layout = ({ children }) => {
  const currentUser = useRef(auth.currentUser);

  return (
    <div className={classes["userSignupLayout--BLOCK"]}>
      <div className={classes["userSignupLayout_content--CONTAINER"]}>
        <nav className={classes["userSignup--NAVBAR"]}>
          <div className={classes["userSignup_navbar_content--CONTAINER"]}>
            <Link className={classes["userSignup_navbar_img--WRAPPER"]} href="/">
              <Image
                src="/logos/dark-amazon.png"
                fill={true}
                style={{objectFit:"contain"}}
                alt="Amazon.com"
              />
            </Link>
          </div>
        </nav>

        {!!currentUser.current ? (
          <div className={classes["userSignup_form--BLOCK"]}>
            <div className={classes["userSignup_form_block--WRAPPER"]}>
              <div className={classes["user_redirection--BLOCK"]}>
                <div className={classes["user_redirection_content--CONTAINER"]}>
                  <div className={classes["user_redirection_icon--WRAPPER"]}>
                    <i className={classes["user_redirection--ICON"]}></i>
                  </div>
                  <div className={classes["user_redirection_typos--WRAPPER"]}>
                    <h4 className={`${classes["user_redirection_message--TITLE"]} md_font`} > Looking for Something? </h4>
                    <p className={`${classes["user_redirection_message--EL"]} md_font`} >
                      We&apos;re sorry. The Web address you entered is not a
                      functioning page on our site
                    </p>

                    <h5 className={`${classes["user_redirection_message--FOOTER"]} md_font`} >
                      Go to Amazon.com&apos;s{" "}
                      <Link className={classes["user_redirection_message_footer--LINK"]} href="/">Home</Link>
                      page
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes["userSignup_form--BLOCK"]}>
            <div className={classes["userSignup_form_block--WRAPPER"]}>
              <div className={classes["userSignup_form--CONTAINER"]}>{children}</div>
            </div>
          </div>
        )}

        <div className={classes["line_break--EL"]} />

        <footer className={classes["userSignup--FOOTER"]}>
          <div className={classes["userSignup_footer_content--CONTAINER"]}>
            <ul className={classes["userSignup_footer_links--LIST"]}>
              <li>
                <Link className={`${classes["userSignup_footer--LINK"]} sm_font`} href="/">conditions of use</Link>
              </li>
              <li>
                <Link className={`${classes["userSignup_footer--LINK"]} sm_font`} href="/">privacy notice</Link>
              </li>
              <li>
                <Link className={`${classes["userSignup_footer--LINK"]} sm_font`} href="/">help</Link>
              </li>
            </ul>

            <span className={`${classes["amazon_copyright_line--EL"]} md_font`}>© 1996-2022, Amazon.com, Inc. or its affiliates</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserSignup_layout;
