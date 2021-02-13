import { List, message, Popconfirm, Typography } from "antd";
import NextLink from "next/link";
import React from "react";

import { useDeleteTodoMutation } from "../../src/generated/graphql";

const TodoListItem = ({ item }: any) => {
  const [deleteTodo] = useDeleteTodoMutation();

  const confirmDelete = async (id: number) => {
    try {
      await deleteTodo({
        variables: {
          id,
        },
        update: (cache) => {
          cache.evict({ id: `Todo:${id}` });
        },
      });

      message.success("ToDo deleted.");
    } catch (error) {
      message.error(`Failed to delete todo: ${error.message}`);
    }
  };

  return (
    <List.Item
      key={item.id}
      actions={[
        <NextLink href="/todo/edit/[id]" as={`/todo/edit/${item.id}`}>
          Edit
        </NextLink>,
        <Popconfirm
          title="Are you sure to delete this todo?"
          onConfirm={() => confirmDelete(item.id)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Delete</a>
        </Popconfirm>,
      ]}
    >
      <Typography.Text>{item.title}</Typography.Text>
    </List.Item>
  );
};

export default TodoListItem;
