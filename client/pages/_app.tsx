import { ApolloProvider } from "@apollo/client";
import "antd/dist/antd.css";
import React from "react";
import { client } from "../services/ApolloClient";
import "../styles/custom.css";
import "../styles/global.css";
import "../styles/vars.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
