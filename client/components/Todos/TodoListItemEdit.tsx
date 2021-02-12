import { Input, Button, Typography, Form, message } from "antd";
import React from "react";
import { useUpdateTodoMutation } from "../../src/generated/graphql";
import Wrapper from "../Wrapper";

const TodoListItemEdit = ({ todo }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = useUpdateTodoMutation({
        variables: values,
      });

      console.log(response);

      if (response) {
        message.success("To-Do updated.");
      }
      form.resetFields();
    } catch (err) {
      message.error(`Failed to update To-Do: ${err.message}`);
    }
  };

  return (
    <Wrapper>
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
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default TodoListItemEdit;
