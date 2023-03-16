import { Layout } from "antd";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/scoobyLogo.png";
import { FeedbackProvider } from "../providers/feedback";
import { useDropzone } from "./useDropzone";

const { Header, Content } = Layout;

export default function Root() {
  const { isDragging } = useDropzone();

  return (
    <FeedbackProvider>
      <Layout style={{ height: "100%" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <Link to={"/"}>
            <img src={logo} style={{ color: "white", height: 50 }} />
          </Link>
        </Header>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 64px)",
          }}
        >
          <Outlet />

          {isDragging && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(41, 128, 185, 0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
              }}
            >
              <h2>Drop a ZIP report load it</h2>
            </div>
          )}
        </Content>
      </Layout>
    </FeedbackProvider>
  );
}
