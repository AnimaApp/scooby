import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Logo from "../assets/logo.svg";

const { Header, Content } = Layout;

export default function Root() {
  return (
    <Layout style={{ height: "100%" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Logo />
      </Header>
      <Content style={{ flex: 1 }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
