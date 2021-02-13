import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import React from "react";

import { client } from "../../../services/ApolloClient";
import Wrapper from "../../Wrapper";
import TodoList from "../TodoList";

const todoList = [
  {
    id: 1,
    title: "Wash dishes",
  },
  {
    id: 2,
    title: "Groceries",
  },
  {
    id: 3,
    title: "Clean the house",
  },
];

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

test("renders TodoList component", async () => {
  const { getAllByText } = render(
    <ApolloProvider client={client}>
      <Wrapper>
        <TodoList todoList={todoList} />
      </Wrapper>
    </ApolloProvider>
  );

  await waitFor(() => {
    getAllByText(/Wash dishes/i);
    getAllByText(/Groceries/i);
    getAllByText(/Clean the house/i);
  });
});
