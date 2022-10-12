import { Breadcrumb, PageHeader } from "antd";
import { ReportId } from "../../data-fetching/api";
import { ReportList } from "./ReportList";

type Props = {
  reports: ReportId[];
  repository: string;
  commit: string;
};

export function Commit({ reports, repository, commit }: Props) {
  return (
    <div style={{ flex: 1 }}>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>{repository}</Breadcrumb.Item>
            <Breadcrumb.Item>{commit}</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{
          borderBottom: "1px solid #c9c9c9",
          marginBottom: "8px",
        }}
      />
      <ReportList reports={reports} repository={repository} commit={commit} />
    </div>
  );
}
