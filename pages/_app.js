import {Fragment} from "react";

import Router from 'next/router';
import Head from "next/head";

import { UserCartContextProvider } from "../customContexts/CartCtx";
import "../styles/Global/globalClasses.scss";

import NProgress from 'nprogress';

NProgress.configure({ easing: "linear",
 template: '<div class="bar" role="bar"> <div class="peg"></div> </div> <div class="page_overlay" />' 
});

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=0.7"></meta>
      </Head>
      
      <UserCartContextProvider>
        <Component {...pageProps} />
      </UserCartContextProvider>
    </Fragment>
  )
}

export default MyApp
