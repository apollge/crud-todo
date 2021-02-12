import {
  List,
  message,
  Popconfirm,
  Button,
  Spin,
  Typography,
  PageHeader,
} from "antd";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useDeleteTodoMutation, useTodosQuery } from "../src/generated/graphql";

function confirm(e) {
  console.log(e);
}

const Home = () => {
  const { Title } = Typography;

  const [todoList, setTodoList] = useState([]);

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
        ></PageHeader>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={todoList}
          renderItem={(item) => (
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
          )}
        ></List>
      </Wrapper>
    )
  );
};

export default Home;
