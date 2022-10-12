import { FractionStatistic } from "@animaapp/scooby-shared";
import { StatisticView } from "./StatisticView";

type Props = {
  statistic: FractionStatistic;
  compact?: boolean;
};

export const FractionStatisticView = ({ statistic, compact }: Props) => {
  return (
    <StatisticView
      compact={compact}
      statistic={statistic}
      value={statistic.numerator}
      suffix={`/ ${statistic.denominator}`}
    />
  );
};
