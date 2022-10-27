import { SummaryStatistic } from "@animaapp/scooby-shared";
import { FractionStatisticView } from "./FractionStatisticView";
import { GaugeStatisticView } from "./GaugeStatisticView";

type Props = {
  stats: SummaryStatistic[];
  compact?: boolean;
};

export const StatsView = (props: Props) => {
  if (props.stats.length === 0) {
    return <span>No statistics have been generated for this report.</span>;
  }

  return (
    <div style={{ display: "flex", gap: props.compact ? 0 : 32 }}>
      {props.stats.map((stat) => {
        if (stat.type === "fraction") {
          return (
            <FractionStatisticView
              key={stat.name}
              statistic={stat}
              compact={props.compact}
            />
          );
        } else if (stat.type === "gauge") {
          return (
            <GaugeStatisticView
              key={stat.name}
              statistic={stat}
              compact={props.compact}
            />
          );
        }
      })}
    </div>
  );
};
