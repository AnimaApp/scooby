export type ReportStatus = {
  name: string;
  state: "success" | "failure";
  description: string;
  url: string;
};
