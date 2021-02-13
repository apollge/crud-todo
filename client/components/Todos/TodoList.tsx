import { List } from "antd";
import React from "react";

import TodoListItem from "./TodoListItem";

interface ITodoListProps {
  todoList: any;
}

const TodoList = ({ todoList }: ITodoListProps) => {
  return (
    <List
      bordered
      itemLayout="horizontal"
      dataSource={todoList}
      renderItem={(item: any) => <TodoListItem item={item} />}
    />
  );
};

export default TodoList;
