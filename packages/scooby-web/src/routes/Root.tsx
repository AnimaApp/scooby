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
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
}
