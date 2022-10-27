import { GaugeStatistic } from "@animaapp/scooby-shared";
import { StatisticView } from "./StatisticView";

type Props = {
  statistic: GaugeStatistic;
  compact?: boolean;
};

export const GaugeStatisticView = ({ statistic, compact }: Props) => {
  return (
    <StatisticView
      compact={compact}
      statistic={statistic}
      value={
        Number.isInteger(statistic.value)
          ? statistic.value.toFixed(0)
          : statistic.value.toFixed(8)
      }
    />
  );
};
