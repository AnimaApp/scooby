import { List } from "antd";
import { ReportId } from "../../../data-fetching/api";
import { ReportListItemController } from "./ReportListItemController";

type Props = {
  reports: ReportId[];
  repository: string;
  commit: string;
};

export const ReportList = (props: Props) => {
  return (
    <div
      style={{
        padding: "0 8px",
      }}
    >
      <List
        dataSource={props.reports}
        renderItem={(id) => (
          <ReportListItemController
            key={id}
            reportId={id}
            repository={props.repository}
            commit={props.commit}
          />
        )}
      />
    </div>
  );
};
