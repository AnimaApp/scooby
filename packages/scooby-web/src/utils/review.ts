import { ReportItem, Review } from "@animaapp/scooby-shared";

export type ItemStatus =
  | "success"
  | "approved"
  | "failure"
  | "changes_requested";

export function computeReportItemsReviewStatuses(
  reportName: string,
  items: ReportItem[],
  review: Review
): Record<string, ItemStatus> {
  const statuses: Record<string, ItemStatus> = {};

  for (const item of items) {
    const approval = review.approvals.find(
      (approval) =>
        approval.id === item.id &&
        approval.hash === item.hash &&
        approval.report === reportName
    );
    const rejection = review.rejections.find(
      (rejection) =>
        rejection.id === item.id &&
        rejection.hash === item.hash &&
        rejection.report === reportName
    );

    let status: ItemStatus;
    if (rejection) {
      status = "changes_requested";
    } else if (approval) {
      status = "approved";
    } else if (item.status === "success") {
      status = "success";
    } else if (item.status === "failure") {
      status = "failure";
    } else {
      throw new Error(
        "invalid state reached, could not determine entry status for id: " +
          item.id
      );
    }

    statuses[item.id] = status;
  }

  return statuses;
}
