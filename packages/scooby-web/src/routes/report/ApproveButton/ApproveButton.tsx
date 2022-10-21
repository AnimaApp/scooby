import { CheckCircleFilled } from "@ant-design/icons";
import { Tooltip, Button } from "antd";

type Props = {
  status:
    | "loading"
    | "to_approve"
    | "approving"
    | "approved"
    | "success"
    | "error";
  onApprove: () => void;
};

export function ApproveButton({ status, onApprove }: Props) {
  if (status === "loading") {
    return (
      <Button disabled loading>
        Approve All
      </Button>
    );
  } else if (status === "to_approve") {
    return (
      <Tooltip title="Approve all the items in the current report">
        <Button
          type="primary"
          icon={<CheckCircleFilled />}
          style={{ backgroundColor: "#27ae60", borderColor: "#27ae60" }}
          onClick={onApprove}
        >
          Approve All
        </Button>
      </Tooltip>
    );
  } else if (status === "approving") {
    return (
      <Button disabled loading>
        Approving...
      </Button>
    );
  } else if (status === "approved") {
    return (
      <Tooltip title="All entries in current report have been approved">
        <Button disabled icon={<CheckCircleFilled />}>
          Approved
        </Button>
      </Tooltip>
    );
  } else if (status === "success") {
    return (
      <Tooltip title="All entries have been successful, so there is nothing to approve">
        <Button disabled icon={<CheckCircleFilled />}>
          Approve all
        </Button>
      </Tooltip>
    );
  }

  return <Button disabled>Unknown error</Button>;
}
