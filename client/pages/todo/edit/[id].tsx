import { Button, Form, Input, message, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import Wrapper from "../../../components/Wrapper";
import {
  useTodoQuery,
  useUpdateTodoMutation,
} from "../../../src/generated/graphql";

const EditTodo = () => {
  const router = useRouter();
  const { Title } = Typography;
  const [form] = Form.useForm();

  const intId =
    typeof router.query.id === "string" ? Number(router.query.id) : -1;

  const { loading, data } = useTodoQuery({
    variables: {
      id: intId,
    },
  });

  const [updateTodo] = useUpdateTodoMutation();

  const onFinish = async (values) => {
    try {
      const response = await updateTodo({
        variables: {
          ...values,
          id: intId,
        },
      });

      console.log(response);
      if (response) {
        message.success("To-Do updated.");

        router.push("/");
      }
    } catch (err) {
      message.error(`Failed to update To-Do: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <Spin />
      </Wrapper>
    );
  }

  if (data.getTodo.errors) {
    return <Wrapper>{data.getTodo.errors.message}</Wrapper>;
  }

  return (
    <Wrapper>
      <Title level={2}>Update To-Do</Title>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={data.getTodo.todo.title} />
        </Form.Item>

        <Form.Item>
          <Button type="text" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default EditTodo;
