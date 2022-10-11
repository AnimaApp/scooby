import { SummaryStatistic } from "@animaapp/scooby-shared";
import { FractionStatisticView } from "./FractionStatisticView";
import { GaugeStatisticView } from "./GaugeStatisticView";

type Props = {
  stats: SummaryStatistic[];
  compact?: boolean;
};

export const StatsView = (props: Props) => {
  return (
    <div style={{ display: "flex", gap: props.compact ? 0 : 4 }}>
      {props.stats.map((stat) => {
        if (stat.type === "fraction") {
          return (
            <FractionStatisticView statistic={stat} compact={props.compact} />
          );
        } else if (stat.type === "gauge") {
          return (
            <GaugeStatisticView statistic={stat} compact={props.compact} />
          );
        }
      })}
    </div>
  );
};
