import React, { useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "../../lib/FirebaseConfig";
import { signOut } from "firebase/auth";

import { UserCartContext } from "../../customContexts/CartCtx";

import { secondary_hmenu_lists_data } from "../../lib/HmenuListsData";

import classes from "../../styles/Components/Global/Hmenu.module.scss";

let first_time_escape = true;

const Hmenu = () => {
  const { currentUser } = auth;
  const router = useRouter();

  const { cleanUserCartStorage__HANDLER } = useContext(UserCartContext);

  const reveal_compressed_list__FUNC = (evt) => {
    evt.preventDefault();

    const compressed_list_btn = evt.currentTarget;
    const compressed_list_id = compressed_list_btn.dataset.compressedListId;
    const compressed_list_el = document.getElementById(`${compressed_list_id}`);

    const listIsRevealed =
      [...compressed_list_el.classList].includes(
        classes["compressed_list_revealed"]
      ) &&
      [...compressed_list_btn.classList].includes(
        classes["compressed_list_revealed"]
      );

    if (listIsRevealed) {
      compressed_list_el.classList.remove(classes["compressed_list_revealed"]);
      compressed_list_btn.classList.remove(classes["compressed_list_revealed"]);
      return;
    }
    if (!listIsRevealed) {
      compressed_list_el.classList.add(classes["compressed_list_revealed"]);
      compressed_list_btn.classList.add(classes["compressed_list_revealed"]);
      return;
    }
  };

  const change_hmenu_list__FUNC = (evt, direction) => {
    evt.preventDefault();
    const hmenu_btn = evt.currentTarget;
    const menu_id = hmenu_btn.dataset.menuId;

    const mainMenu__list = document.querySelector(
      `.${classes["hmenu_links_list--EL"]}[data-menu-id="1"]`
    );
    const targetedMenu__list = document.querySelector(
      `.${classes["hmenu_links_list--EL"]}[data-menu-id="${menu_id}"]`
    );

    if (direction === "forwards") {
      mainMenu__list.classList.remove(classes["hmenu_list_centered"]);
      mainMenu__list.classList.add(classes["hmenu_list_lefted"]);

      targetedMenu__list.classList.remove(classes["hmenu_list_righted"]);
      targetedMenu__list.classList.add(classes["hmenu_list_centered"]);
    }

    if (direction === "backwards") {
      mainMenu__list.classList.remove(classes["hmenu_list_lefted"]);
      mainMenu__list.classList.add(classes["hmenu_list_centered"]);

      targetedMenu__list.classList.add(classes["hmenu_list_righted"]);
      targetedMenu__list.classList.remove(classes["hmenu_list_centered"]);
    }
  };

  const close_hmenu__FUNC = () => {
    const hmenu__EL = document.querySelector(`.${classes["hmenu--BLOCK"]}`);

    hmenu__EL.classList.remove(classes["open_hmenu"]);
  };

  const navbarSignOutClick__EventHandler = () => {
    signOut(auth).then(() => {
      cleanUserCartStorage__HANDLER();
      router.push("/signin");
    });
  };

  useEffect(() => {
    if (first_time_escape) {
      first_time_escape = false;

      return;
    }

    const secondary_hmenu_lists__FUNC = () => {
      const hmenu_lists_container = document.querySelector(
        `.${classes["hmenu_content--CONTAINER"]}`
      );

      const hmenu_lists_ARR = secondary_hmenu_lists_data.map(
        ({ menuId, items }) => {
          const hmenu_list__UL = document.createElement("ul");
          hmenu_list__UL.classList.add(classes["hmenu_links_list--EL"]);
          hmenu_list__UL.classList.add(classes["hmenu_list_righted"]);
          hmenu_list__UL.setAttribute("data-menu-id", menuId);

          const hmenu_list_RETURNTOMAINMENU__LI = document.createElement("li");

          const hmenu_list_RETURNTOMAINMENU__A = document.createElement("a");
          hmenu_list_RETURNTOMAINMENU__A.setAttribute("data-menu-id", menuId);
          hmenu_list_RETURNTOMAINMENU__A.href = "/";
          hmenu_list_RETURNTOMAINMENU__A.className = `${classes["hmenu_item--EL"]} ${classes["hmenu_return_to_mainMenu--EL"]} md_lg_font`;
          hmenu_list_RETURNTOMAINMENU__A.onclick = (evt) =>
            change_hmenu_list__FUNC(evt, "backwards");

          const hmenu_list_RETURNTOMAINMENU__DIV =
            document.createElement("div");
          hmenu_list_RETURNTOMAINMENU__DIV.classList.add(
            classes["hmenu_item_content--CONTAINER"]
          );

          const hmenu_list_RETURNTOMAINMENU__I = document.createElement("i");
          hmenu_list_RETURNTOMAINMENU__I.classList.add(
            classes["return_to_mainMenu--ICON"]
          );

          const hmenu_list_RETURNTOMAINMENU__SPAN =
            document.createElement("span");
          hmenu_list_RETURNTOMAINMENU__SPAN.classList.add(
            classes["hmenu_item_title--EL"]
          );
          hmenu_list_RETURNTOMAINMENU__SPAN.textContent = "main menu";

          hmenu_list_RETURNTOMAINMENU__DIV.appendChild(
            hmenu_list_RETURNTOMAINMENU__I
          );
          hmenu_list_RETURNTOMAINMENU__DIV.appendChild(
            hmenu_list_RETURNTOMAINMENU__SPAN
          );

          hmenu_list_RETURNTOMAINMENU__A.appendChild(
            hmenu_list_RETURNTOMAINMENU__DIV
          );

          hmenu_list_RETURNTOMAINMENU__LI.appendChild(
            hmenu_list_RETURNTOMAINMENU__A
          );

          const hmenu_list_RETURNTOMAINMENU__BREAKLINE =
            document.createElement("li");
          hmenu_list_RETURNTOMAINMENU__BREAKLINE.classList.add(
            classes["hmenu_break_line--EL"]
          );

          hmenu_list__UL.appendChild(hmenu_list_RETURNTOMAINMENU__LI);
          hmenu_list__UL.appendChild(hmenu_list_RETURNTOMAINMENU__BREAKLINE);

          items.forEach((item) => {
            const hmenu_list__LI = document.createElement("li");

            if (item.type === "title") {
              hmenu_list__LI.className = `${classes["hmenu_list_title--EL"]} lg_font`;
              hmenu_list__LI.textContent = item.text;
            }

            if (item.type === "break line")
              hmenu_list__LI.classList.add(classes["hmenu_break_line--EL"]);

            if (item.type === "link") {
              const hmenu_list__A = document.createElement("a");
              hmenu_list__A.href = item.href;
              hmenu_list__A.className = `${classes["hmenu_item--EL"]} ${classes["hmenu_item--LINK"]} md_lg_font`;
              hmenu_list__A.onclick = (evt) => router.push(item.href);

              const hmenu_list__DIV = document.createElement("div");
              hmenu_list__DIV.classList.add(
                classes["hmenu_item_content--CONTAINER"]
              );

              const hmenu_list__SPAN = document.createElement("span");
              hmenu_list__SPAN.classList.add(classes["hmenu_item_title--EL"]);

              hmenu_list__SPAN.textContent = item.text;

              // Merging Elements Together

              hmenu_list__DIV.appendChild(hmenu_list__SPAN);
              hmenu_list__A.appendChild(hmenu_list__DIV);
              hmenu_list__LI.appendChild(hmenu_list__A);
            }

            hmenu_list__UL.appendChild(hmenu_list__LI);
          });

          return hmenu_list__UL;
        }
      );

      hmenu_lists_ARR.forEach((hmenu_list) => {
        hmenu_lists_container.appendChild(hmenu_list);
      });
    };

    secondary_hmenu_lists__FUNC();
  }, [router]);

  return (
    <div id="hmenu--BLOCK" className={`${classes["hmenu--BLOCK"]}`}>
      <div className={classes["hmenu_navigation--BLOCK"]}>
        <div className={classes["hmenu_header--BLOCK"]}>
          {currentUser ? (
            <Link href="javascript:void(0)">
              <a className={classes["hmenu_customer_profile--LINK"]}>
                <div
                  className={
                    classes["hmenu_customer_profile_content--CONTAINER"]
                  }
                >
                  <i className={classes["customer_profile--ICON"]}></i>
                  <span
                    className={`${classes["customer_profile_name--EL"]} lg_font`}
                  >
                    Hello, {currentUser.displayName}
                  </span>
                </div>
              </a>
            </Link>
          ) : (
            <Link href="/signin">
              <a className={classes["hmenu_customer_profile--LINK"]}>
                <div
                  className={
                    classes["hmenu_customer_profile_content--CONTAINER"]
                  }
                >
                  <i className={classes["customer_profile--ICON"]}></i>
                  <span
                    className={`${classes["customer_profile_name--EL"]} lg_font`}
                  >
                    Hello, sign in
                  </span>
                </div>
              </a>
            </Link>
          )}

          <i
            onClick={close_hmenu__FUNC}
            className={classes["close_hmenu--BTN"]}
          ></i>
        </div>
        <div className={classes["hmenu_content--CONTAINER"]}>
          <ul
            data-menu-id="1"
            className={`${classes["hmenu_links_list--EL"]} ${classes["hmenu_list_centered"]}`}
          >
            <li className={`${classes["hmenu_list_title--EL"]} lg_font`}>
              Digital Content & Devices
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="2"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      amazon music
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="3"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Kindle E-readers & Books
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="4"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Appstore for Android
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>

            {/* Section Break Line */}
            <li className={classes["hmenu_break_line--EL"]}></li>
            {/* ------------------------------------- */}

            <li className={`${classes["hmenu_list_title--EL"]} lg_font`}>
              Shop By Department
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="5"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Electronics
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="6"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Computers
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/">
                <a
                  data-menu-id="7"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Smart Home
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="8"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Arts & Crafts
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>

            <ul
              id="shopByDepartement_compressed_list"
              className={`${classes["hmenu_compressed_list--EL"]}`}
            >
              {/* Section Break Line */}
              <li className={classes["hmenu_break_line--EL"]}></li>
              {/* ------------------------------------- */}

              <li>
                <Link href="/">
                  <a
                    data-menu-id="9"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Automotive
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="10"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Baby
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="11"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Beauty and personal care
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="12"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Women&#39;s Fashion
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="13"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        men&#39;s Fashion
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="14"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        girl&#39;s Fashion
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="15"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        boy&#39;s Fashion
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="16"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Health and Household
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="17"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Home and Kitchen
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="18"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Industrial and Scientific
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="19"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Luggage
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="20"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Movies & Television
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="21"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Pet supplies
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="22"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Software
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="23"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Sports and Outdoors
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="24"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Tools & Home Improvement
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="25"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Toys and Games
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    data-menu-id="26"
                    className={classes["hmenu_item--EL"]}
                    onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Video Games
                      </span>
                      <i className={classes["hmenu_item--ICON"]}></i>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>

            <li>
              <Link href="/">
                <a
                  onClick={reveal_compressed_list__FUNC}
                  data-compressed-list-id="shopByDepartement_compressed_list"
                  className={`${classes["hmenu_item--EL"]} ${classes["hmenu_compressed_list--BTN"]}`}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      See More
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>

            {/* Section Break Line */}
            <li className={classes["hmenu_break_line--EL"]}></li>
            {/* ------------------------------------- */}

            <li className={`${classes["hmenu_list_title--EL"]} lg_font`}>
              Programs & Features
            </li>

            <li>
              <Link href="/">
                <a
                  data-menu-id="27"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Gift Cards
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="javascript:void(0)">
                <a
                  className={`${classes["hmenu_item--EL"]} ${classes["hmenu_item--LINK"]}`}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      #FoundItOnAmazon
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="28"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      Amazon Live
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  data-menu-id="29"
                  className={classes["hmenu_item--EL"]}
                  onClick={(evt) => change_hmenu_list__FUNC(evt, "forwards")}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      International Shopping
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>

            <ul
              id="programs&features_compressed_list"
              className={`${classes["hmenu_compressed_list--EL"]}`}
            >
              {/* Section Break Line */}
              <li className={classes["hmenu_break_line--EL"]}></li>
              {/* ------------------------------------- */}

              <li>
                <Link href="javascript:void(0)">
                  <a
                    className={`${classes["hmenu_item--EL"]} ${classes["hmenu_item--LINK"]}`}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        Amazon Second Chance
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>

            <li>
              <Link href="javascript:void(0)">
                <a
                  onClick={reveal_compressed_list__FUNC}
                  data-compressed-list-id="programs&features_compressed_list"
                  className={`${classes["hmenu_item--EL"]} ${classes["hmenu_compressed_list--BTN"]}`}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      See More
                    </span>
                    <i className={classes["hmenu_item--ICON"]}></i>
                  </div>
                </a>
              </Link>
            </li>

            {/* Section Break Line */}
            <li className={classes["hmenu_break_line--EL"]}></li>
            {/* ------------------------------------- */}

            <li className={`${classes["hmenu_list_title--EL"]} lg_font`}>
              Help & Settings
            </li>

            <li>
              <Link href="javascript:void(0)">
                <a
                  className={`${classes["hmenu_item--EL"]} ${classes["hmenu_item--LINK"]}`}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      your account
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="javascript:void(0)">
                <a
                  className={`${classes["hmenu_item--EL"]} ${classes["hmenu_customer_config_item--LINK"]}`}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <i className={classes["hmenu_lang_config--ICON"]}></i>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      english
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="javascript:void(0)">
                <a
                  className={`${classes["hmenu_item--EL"]} ${classes["hmenu_customer_config_item--LINK"]}`}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <i className={classes["hmenu_country_config--ICON"]}></i>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      united states
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="javascript:void(0)">
                <a
                  className={`${classes["hmenu_item--EL"]} ${classes["hmenu_item--LINK"]}`}
                >
                  <div className={classes["hmenu_item_content--CONTAINER"]}>
                    <span
                      className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                    >
                      customer service
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            {!currentUser ? (
              <li>
                <Link href="/signin">
                  <a
                    className={`${classes["hmenu_item--EL"]} ${classes["hmenu_item--LINK"]}`}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        sign in
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
            ) : (
              <li>
                <Link href="javascript:void(0)">
                  <a
                    onClick={navbarSignOutClick__EventHandler}
                    className={`${classes["hmenu_item--EL"]} ${classes["hmenu_item--LINK"]}`}
                  >
                    <div className={classes["hmenu_item_content--CONTAINER"]}>
                      <span
                        className={`${classes["hmenu_item_title--EL"]} md_lg_font`}
                      >
                        sign out
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hmenu;
