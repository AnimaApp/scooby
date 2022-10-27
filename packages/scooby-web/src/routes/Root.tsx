import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import logo from "../assets/scooby-logo.png";
import { FeedbackProvider } from "../providers/feedback";

const { Header, Content } = Layout;

export default function Root() {
  return (
    <FeedbackProvider>
      <Layout style={{ height: "100%" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} style={{ color: "white", height: 50 }} />
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
    </FeedbackProvider>
  );
}
