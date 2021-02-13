import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import React from "react";

import Wrapper from "../../components/Wrapper";
import { client } from "../../services/ApolloClient";
import Home from "../index";

test("apollo client", async () => {
  const { getByText } = render(
    <ApolloProvider client={client}>Test</ApolloProvider>
  );

  expect(getByText("Test")).toBeTruthy();
});

test("renders home", async () => {
  const { getAllByText } = render(
    <ApolloProvider client={client}>
      <Wrapper>
        <Home />
      </Wrapper>
    </ApolloProvider>
  );

  await waitFor(() => getAllByText(/ToDos/i));
});
