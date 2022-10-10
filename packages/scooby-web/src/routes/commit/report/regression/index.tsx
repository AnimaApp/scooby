import { RegressionReport } from "@animaapp/scooby-shared";
import { Layout } from "antd";

const { Content, Sider } = Layout;

type Props = {
  report: RegressionReport;
};

export function RegressionReport({ report }: Props) {
  return (
    <Layout style={{ height: "100%" }}>
      <Sider></Sider>
      <Content style={{ flex: 1 }}>
        <h1>{report.name}</h1>
      </Content>
    </Layout>
  );
}
