import { HostedRegressionReport } from "@animaapp/scooby-shared";
import {
  CheckOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Row, Col, Statistic } from "antd";
import { useMemo } from "react";

type Props = {
  report: HostedRegressionReport;
};

const Summary = ({ report }: Props) => {
  const totalTestCount = useMemo(() => {
    return (
      report.results.new.length +
      report.results.removed.length +
      report.results.changed.length +
      report.results.unchanged.length
    );
  }, [report.results]);

  const statColors = useMemo(() => {
    return {
      changed: report.results.changed.length > 0 ? "red" : "green",
      new: report.results.new.length > 0 ? "orange" : "green",
      removed: report.results.removed.length > 0 ? "orange" : "green",
      unchanged: "green",
    };
  }, [report.results]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={4}>
          <Statistic
            title="Changed"
            valueStyle={{ color: statColors["changed"] }}
            value={report.results.changed.length}
            suffix={`/ ${totalTestCount}`}
            prefix={<WarningOutlined />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="New"
            valueStyle={{ color: statColors["new"] }}
            value={report.results.new.length}
            suffix={`/ ${totalTestCount}`}
            prefix={<PlusCircleOutlined />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Removed"
            valueStyle={{ color: statColors["removed"] }}
            value={report.results.removed.length}
            suffix={`/ ${totalTestCount}`}
            prefix={<MinusCircleOutlined />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Unchanged"
            valueStyle={{ color: statColors["unchanged"] }}
            value={report.results.unchanged.length}
            suffix={`/ ${totalTestCount}`}
            prefix={<CheckOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
