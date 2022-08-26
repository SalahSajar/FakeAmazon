import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import md5 from "md5";

import { auth } from "../lib/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import useSignupFormValidator from "../customHooks/useSignupFormValidator";

import UserSignup_layout from "../components/Layout/UserSignup_layout";

import classes from "../styles/Components/Global/UserSignup_layout.module.scss";

const Register = () => {
  const router = useRouter();

  const [defaultState, setDefaultState] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorType, setRegisterErrorType] = useState(null);

  const {
    fullFormCheck__HANDLER,

    nameInputHandlers_OBJ,
    emailInputHandlers_OBJ,
    passwordInputHandlers_OBJ,
    passwordCopyInputHandlers_OBJ,

    nameInputIsValid,
    emailInputIsValid,
    passwordInputIsValid,
    passwordCopyInputIsValid,

    nameInputErrorMessage,
    emailInputErrorMessage,
    passwordInputErrorMessage,
    passwordCopyInputErrorMessage,
  } = useSignupFormValidator("register");

  const submitRegisterForm__HANDLER = (evt) => {
    evt.preventDefault();

    const nameInputValue = evt.target.name.value;
    const emailInputValue = evt.target.email.value;
    const passwordInputValue = evt.target.password.value;

    const formIsValid = fullFormCheck__HANDLER(evt, "register");

    if (!!formIsValid) {
      setRegisterLoading(true);
      setRegisterSuccess(false);
      setRegisterError(false);

      setDefaultState(false);

      createUserWithEmailAndPassword(
        auth,
        emailInputValue,
        md5(passwordInputValue)
      )
        .then((userCredential) => {
          setRegisterLoading(false);
          setRegisterSuccess(true);

          return updateProfile(userCredential.user, {
            displayName: nameInputValue,
          }).catch((err) => console.log(err));
        })

        .catch((err) => {
          if (err.message.includes("auth/email-already-in-use")) {
            setRegisterErrorType("email-already-in-use");
          } else {
            setRegisterErrorType("some-other-else");
          }

          setRegisterError(true);
          setRegisterSuccess(false);
          setRegisterLoading(false);
        });
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    }
  }, [registerSuccess, router]);

  return (
    <Fragment>
      <Head>
        <title>Amazon Registration</title>
      </Head>

      <UserSignup_layout>
        <form
          className={classes["userSignup--FORM"]}
          onSubmit={submitRegisterForm__HANDLER}
        >
          <div className={classes["userSignup_form_content--CONTAINER"]}>
            <h2 className={`${classes["userSignup_form_title--EL"]} xxlg_font`}>
              Create Account
            </h2>

            {!defaultState && !registerLoading ? (
              <div
                className={`${classes["user_signup_state--BLOCK"]} ${
                  registerError && !registerSuccess
                    ? classes["signup_error_state"]
                    : classes["signup_success_state"]
                }`}
              >
                <span
                  className={`${classes["user_signup_state_message--EL"]} sm_font`}
                >
                  {registerError && !registerSuccess
                    ? registerErrorType === "email-already-in-use"
                      ? "Email address already in use"
                      : "something is wrong. please try again later"
                    : "registration succeeded"}
                </span>
              </div>
            ) : (
              ""
            )}

            <div className={classes["userSignup_formInputs--CONTAINER"]}>
              <div className={classes["userSignup_formInput--WRAPPER"]}>
                <label className={`sm_font`} htmlFor="name">
                  your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onBlur={(evt) =>
                    nameInputHandlers_OBJ.nameInputBlur__HANDLER(evt)
                  }
                  onFocus={(evt) =>
                    nameInputHandlers_OBJ.nameInputFocus__HANDLER(evt)
                  }
                  onChange={(evt) =>
                    nameInputHandlers_OBJ.nameInputChange__HANDLER(evt)
                  }
                />
                {!nameInputIsValid && !!nameInputErrorMessage && (
                  <div className={classes["userSignup_input_error--EL"]}>
                    <i className={classes["userSignup_input_error--ICON"]}></i>
                    <span
                      className={`${classes["userSignup_input_error--MESSAGE"]} sm_font`}
                    >
                      {nameInputErrorMessage}
                    </span>
                  </div>
                )}
              </div>
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
              <div className={classes["userSignup_formInput--WRAPPER"]}>
                <label className={`sm_font`} htmlFor="passwordCopy">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  id="passwordCopy"
                  name="passwordCopy"
                  onBlur={(evt) =>
                    passwordCopyInputHandlers_OBJ.passwordCopyInputBlur__HANDLER(
                      evt
                    )
                  }
                  onFocus={(evt) =>
                    passwordCopyInputHandlers_OBJ.passwordCopyInputFocus__HANDLER(
                      evt
                    )
                  }
                  onChange={(evt) =>
                    passwordCopyInputHandlers_OBJ.passwordCopyInputChange__HANDLER(
                      evt
                    )
                  }
                />

                {!passwordCopyInputIsValid && !!passwordCopyInputErrorMessage && (
                  <div className={classes["userSignup_input_error--EL"]}>
                    <i className={classes["userSignup_input_error--ICON"]}></i>
                    <span
                      className={`${classes["userSignup_input_error--MESSAGE"]} sm_font`}
                    >
                      {passwordCopyInputErrorMessage}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`${classes["userSignup_form_submit--BTN"]} md_font`}
              >
                {registerLoading ? (
                  <Image
                    src="/icons/dark-loading-circle.gif"
                    width="23"
                    height="23"
                    alt="dark loading circle"
                  />
                ) : (
                  "continue"
                )}
              </button>
            </div>

            <div className={classes["another_signup_method--BLOCK"]}>
              <div className={classes["another_signup_method_title--WRAPPER"]}>
                <span
                  className={`${classes["another_signup_method--TITLE"]} sm_font`}
                >
                  Already have an Account?
                </span>
              </div>

              <Link href="/signin">
                <a
                  className={`${classes["another_signup_method--LINK"]} md_font`}
                >
                  Sign-In
                </a>
              </Link>
            </div>
          </div>
        </form>
      </UserSignup_layout>
    </Fragment>
  );
};

export default Register;
