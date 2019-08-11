import App, { Container } from "next/app";
import React from "react";
import { Provider } from "unstated";
import Router from "next/router";
import withGA from "next-ga";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withGA(process.env.GOOGLE_ANALYTICS_TRACKING_ID, Router)(MyApp);
