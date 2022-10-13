import { Sentiment } from "@animaapp/scooby-shared";

export function getColorForSentiment(sentiment: Sentiment): string {
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
