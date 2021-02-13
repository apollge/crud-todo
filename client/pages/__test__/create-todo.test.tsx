import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import React from "react";

import Wrapper from "../../components/Wrapper";
import { client } from "../../services/ApolloClient";
import CreateTodo from "../create-todo";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test("renders create-todo page", async () => {
  const { getAllByText, getByLabelText } = render(
    <ApolloProvider client={client}>
      <Wrapper>
        <CreateTodo />
      </Wrapper>
    </ApolloProvider>
  );

  await waitFor(() => {
    getAllByText(/Add To-Do/i);
    getByLabelText(/Title/i);
    getAllByText(/Submit/i);
  });
});
