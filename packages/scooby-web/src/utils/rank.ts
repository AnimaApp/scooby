import { Sentiment } from "@animaapp/scooby-shared";

export function getRankForSentiment(sentiment: Sentiment): number {
  switch (sentiment) {
    case "danger":
      return 0;
    case "warning":
      return 1;
    case "info":
      return 2;
    case "success":
      return 3;
  }
}
