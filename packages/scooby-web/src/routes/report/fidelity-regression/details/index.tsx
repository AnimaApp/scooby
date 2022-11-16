import { HostedFidelityRegressionReport } from "@animaapp/scooby-shared";
import { DatabaseOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { MetadataTab } from "./MetadataTab";
import "./style.css";

type Props = {
  selectedId: string | undefined;
  report: HostedFidelityRegressionReport;
};

export const DetailsView = ({ selectedId, report }: Props) => {
  return (
    <Tabs
      id="details-view"
      centered
      defaultActiveKey="metadata"
      style={{
        width: "100%",
        height: "100%",
      }}
      items={[
        {
          key: "metadata",
          label: (
            <span>
              <DatabaseOutlined />
              Metadata
            </span>
          ),
          children: <MetadataTab report={report} selectedId={selectedId} />,
        },
      ]}
    />
  );
};
