import { SummaryStatistic } from "@animaapp/scooby-shared";
import { Statistic, Tag, Tooltip } from "antd";
import { ReactNode } from "react";
import { capitalize } from "../../utils/capitalize";
import { getColorForSentiment } from "./colors";

type Props = {
  statistic: SummaryStatistic;
  compact?: boolean;
  value?: string | number;
  suffix?: ReactNode;
  prefix?: ReactNode;
};

export const StatisticView = ({
  statistic,
  value,
  suffix,
  prefix,
  compact,
}: Props) => {
  const color = getColorForSentiment(statistic.sentiment);

  return (
    <Tooltip title={statistic.description ?? statistic.name}>
      {compact ? (
        <Tag color={color} icon={prefix}>
          {capitalize(statistic.name)}: {value}
          {suffix}
        </Tag>
      ) : (
        <Statistic
          title={capitalize(statistic.name)}
          valueStyle={{
            color,
          }}
          value={value}
          suffix={suffix}
          prefix={prefix}
        />
      )}
    </Tooltip>
  );
};
