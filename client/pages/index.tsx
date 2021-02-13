import { Button, PageHeader, Spin } from "antd";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

import TodoList from "../components/Todos/TodoList";
import Wrapper from "../components/Wrapper";
import { useTodosQuery } from "../src/generated/graphql";

const Home = () => {
  const [todoList, setTodoList] = useState([]);

  const { loading, error, data } = useTodosQuery();

  useEffect(() => {
    if (!loading && !error && data) {
      setTodoList(data.getTodos);
    }
  }, [data]);

  if (loading) {
    return (
      <Wrapper>
        <Spin />
      </Wrapper>
    );
  }

  if (loading) {
    return (
      <Wrapper>
        <Spin />
      </Wrapper>
    );
  }

  if (error) {
    return <Wrapper>{error.message}</Wrapper>;
  }

  return (
    data && (
      <Wrapper>
        <PageHeader
          title="ToDos"
          extra={[
            <Button key="1" type="link">
              <NextLink href="/create-todo">Create ToDo</NextLink>
            </Button>,
          ]}
        />
        <TodoList todoList={todoList} />
      </Wrapper>
    )
  );
};

export default Home;
