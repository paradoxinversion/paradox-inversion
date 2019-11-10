import App from "next/app";
import React from "react";
import { Provider } from "unstated";
import Router from "next/router";
import withGA from "next-ga";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <DefaultSeo {...SEO} />
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </React.Fragment>
    );
  }
}

export default withGA(process.env.GOOGLE_ANALYTICS_TRACKING_ID, Router)(MyApp);
