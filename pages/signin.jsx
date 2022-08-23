import React, { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import useSignupFormValidator from "../customHooks/useSignupFormValidator";

import { UserCartContext } from "../customContexts/CartCtx";

import { auth } from "../lib/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import UserSignup_layout from "../components/Layout/UserSignup_layout";

import md5 from "md5";

import classes from "../styles/Components/Global/UserSignup_layout.module.scss";

const Signin = () => {
  const { userCartFromDB__HANDLER } = useContext(UserCartContext);
  const router = useRouter();

  const {
    fullFormCheck__HANDLER,

    emailInputHandlers_OBJ,
    passwordInputHandlers_OBJ,

    emailInputIsValid,
    passwordInputIsValid,

    emailInputErrorMessage,
    passwordInputErrorMessage,
  } = useSignupFormValidator("signin");

  const [defaultState, setDefaultState] = useState(true);
  const [signinLoading, setSigninLoading] = useState(false);
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [signinError, setSigninError] = useState(false);
  const [signinErrorType, setSigninErrorType] = useState(null);

  const submitUserSigninForm__HANDLER = (evt) => {
    evt.preventDefault();

    const emailInputValue = evt.target.email.value;
    const passwordInputValue = evt.target.password.value;

    const formIsValid = fullFormCheck__HANDLER(evt, "signin");

    if (!!formIsValid) {
      setSigninLoading(true);
      setSigninSuccess(false);
      setSigninError(false);

      setDefaultState(false);

      signInWithEmailAndPassword(auth, emailInputValue, md5(passwordInputValue))
        .then((userCredential) => {
          setSigninLoading(false);
          setSigninSuccess(true);

          console.log("---------- userCredential ----------");
          console.log(userCredential);
          userCartFromDB__HANDLER(userCredential.user.uid);
        })

        .catch((err) => {
          console.log("---------- ERROR ----------");
          console.log(err);

          setSigninError(true);
          setSigninSuccess(false);
          setSigninLoading(false);

          if (err.message.includes("auth/wrong-password")) {
            setSigninErrorType("incorrect-password");
            return;
          }

          if (err.message.includes("auth/user-not-found")) {
            setSigninErrorType("user-not-found");
            return;
          }

          setSigninErrorType("some-other-else");
        });
    }
  };

  useEffect(() => {
    if (signinSuccess) {
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    }
  }, [signinSuccess, router]);

  return (
    <Fragment>
      <UserSignup_layout>
        <form
          className={classes["userSignup--FORM"]}
          onSubmit={submitUserSigninForm__HANDLER}
        >
          <div className={classes["userSignup_form_content--CONTAINER"]}>
            <h2 className={`${classes["userSignup_form_title--EL"]} xxlg_font`}>
              Sign-In
            </h2>

            {!defaultState && !signinLoading ? (
              <div
                className={`${classes["user_signup_state--BLOCK"]} ${
                  signinError && !signinSuccess
                    ? classes["signup_error_state"]
                    : classes["signup_success_state"]
                }`}
              >
                <span
                  className={`${classes["user_signup_state_message--EL"]} sm_font`}
                >
                  {signinError && !signinSuccess
                    ? signinErrorType === "incorrect-password"
                      ? "your password is incorrect"
                      : signinErrorType === "user-not-found"
                      ? "user no found"
                      : "something is wrong. please try again later"
                    : "registration succeeded"}
                </span>
              </div>
            ) : (
              ""
            )}

            <div className={classes["userSignup_formInputs--CONTAINER"]}>
              <div className={classes["userSignup_formInput--WRAPPER"]}>
                <label className={`sm_font`} htmlFor="email">
                  Email
                </label>

                <input
                  type="text"
                  id="email"
                  name="email"
                  onBlur={(evt) =>
                    emailInputHandlers_OBJ.emailInputBlur__HANDLER(evt)
                  }
                  onFocus={(evt) =>
                    emailInputHandlers_OBJ.emailInputFocus__HANDLER(evt)
                  }
                  onChange={(evt) =>
                    emailInputHandlers_OBJ.emailInputChange__HANDLER(evt)
                  }
                />

                {!emailInputIsValid && !!emailInputErrorMessage && (
                  <div className={classes["userSignup_input_error--EL"]}>
                    <i className={classes["userSignup_input_error--ICON"]}></i>
                    <span
                      className={`${classes["userSignup_input_error--MESSAGE"]} sm_font`}
                    >
                      {emailInputErrorMessage}
                    </span>
                  </div>
                )}
              </div>

              <div className={classes["userSignup_formInput--WRAPPER"]}>
                <label className={`sm_font`} htmlFor="password">
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onBlur={(evt) =>
                    passwordInputHandlers_OBJ.passwordInputBlur__HANDLER(evt)
                  }
                  onFocus={(evt) =>
                    passwordInputHandlers_OBJ.passwordInputFocus__HANDLER(evt)
                  }
                  onChange={(evt) =>
                    passwordInputHandlers_OBJ.passwordInputChange__HANDLER(evt)
                  }
                />

                {!passwordInputIsValid && !!passwordInputErrorMessage && (
                  <div className={classes["userSignup_input_error--EL"]}>
                    <i className={classes["userSignup_input_error--ICON"]}></i>
                    <span
                      className={`${classes["userSignup_input_error--MESSAGE"]} sm_font`}
                    >
                      {passwordInputErrorMessage}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`${classes["userSignup_form_submit--BTN"]} md_font`}
              >
                {signinLoading ? (
                  <Image
                    src="/icons/dark-loading-circle.gif"
                    width="23"
                    height="23"
                    alt="dark loading circle"
                  />
                ) : (
                  "Sign-In"
                )}
              </button>
            </div>

            <div className={classes["another_signup_method--BLOCK"]}>
              <div className={classes["another_signup_method_title--WRAPPER"]}>
                <span
                  className={`${classes["another_signup_method--TITLE"]} sm_font`}
                >
                  new to amazon?
                </span>
              </div>

              <Link href="/register">
                <a
                  className={`${classes["another_signup_method--LINK"]} md_font`}
                >
                  create your amazon account
                </a>
              </Link>
            </div>
          </div>
        </form>
      </UserSignup_layout>
    </Fragment>
  );
};

export default Signin;
