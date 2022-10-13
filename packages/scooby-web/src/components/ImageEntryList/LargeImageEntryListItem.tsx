import { Card, Tag } from "antd";
import { useEffect, useRef } from "react";
import { getColorForSentiment } from "../../utils/colors";
import { ImageEntry } from "./ImageEntryList";

type Props = {
  selected?: boolean;
  entry: ImageEntry;
  onClick: () => void;
};

export const LargeImageEntryListItem = ({
  selected,
  entry,
  onClick,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  const color = entry.sentiment
    ? getColorForSentiment(entry.sentiment)
    : "black";

  return (
    <Card
      ref={ref}
      hoverable
      title={entry.id}
      extra={entry.tag ? <Tag color={color}>{entry.tag}</Tag> : null}
      size="small"
      bodyStyle={{ padding: 0, position: "relative" }}
      style={{
        width: "200px",
        marginBottom: 8,
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: `inset 0px 0px 0px ${selected ? 4 : 1}px ${color}`,
        }}
      ></div>
      <img
        src={entry.thumbnailUrl}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "contain",
          background:
            "repeating-conic-gradient(#ededed 0% 25%, transparent 0% 50%) 50% / 20px 20px",
          padding: 1,
        }}
      />
    </Card>
  );
};
