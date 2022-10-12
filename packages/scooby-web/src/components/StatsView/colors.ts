import { SummaryStatistic } from "@animaapp/scooby-shared";

export function getColorForSentiment(
  sentiment: SummaryStatistic["sentiment"]
): string {
  switch (sentiment) {
    case "danger":
      return "red";
    case "info":
      return "blue";
    case "success":
      return "green";
    case "warning":
      return "orange";
  }
}
