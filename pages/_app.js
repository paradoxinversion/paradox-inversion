import App from "next/app";
import React, {Fragment} from "react";
import { Provider } from "unstated";
import Router from "next/router";
import withGA from "next-ga";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <DefaultSeo {...SEO} />
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Fragment>
    );
  }
}

export default withGA(process.env.GOOGLE_ANALYTICS_TRACKING_ID, Router)(MyApp);
