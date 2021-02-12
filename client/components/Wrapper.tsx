import { Layout, Typography } from "antd";
import NextLink from "next/link";
import React from "react";

const Wrapper = ({ children }) => {
  const { Header, Content } = Layout;

  const { Title } = Typography;

  return (
    <Layout className="layout">
      <Header className="py-2">
        <Title>
          <NextLink href="/">Todos</NextLink>
        </Title>
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default Wrapper;
