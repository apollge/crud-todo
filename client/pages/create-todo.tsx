import { InMemoryCache } from "@apollo/client";
import { Button, Form, Input, message, Typography } from "antd";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import React from "react";

import Wrapper from "../components/Wrapper";
import { useCreateTodoMutation } from "../src/generated/graphql";

const CreateTodo: React.FC<{}> = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [createTodo, { loading }] = useCreateTodoMutation();

  const { Title } = Typography;

  const onFinish = async (values) => {
    try {
      const response = await createTodo({
        variables: values,
        update: (cache) => {
          cache.evict({ fieldName: "todos" });
        },
      });

      if (response.data) {
        message.success("To-Do created.");
      }
      form.resetFields();
      router.push("/");
    } catch (err) {
      message.error(`Failed to create To-Do: ${err.message}`);
    }
  };

  return (
    <Wrapper>
      <Title level={2}>Add To-Do</Title>
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
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default CreateTodo;
