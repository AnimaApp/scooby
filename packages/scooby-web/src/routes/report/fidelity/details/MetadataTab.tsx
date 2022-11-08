import {
  HostedFidelityReport,
  HostedResource,
  Metadata,
} from "@animaapp/scooby-shared";
import { useMemo } from "react";
import { MetadataList } from "../../../../components/MetadataList";

type Props = {
  selectedId: string | undefined;
  report: HostedFidelityReport;
};

export const MetadataTab = ({ selectedId, report }: Props) => {
  const metadata: Metadata<HostedResource>[] = useMemo(() => {
    if (!selectedId) {
      return [];
    }

    for (const entry of report.pairs) {
      if (entry.actual.id === selectedId) {
        return [
          ...(entry.actual.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(actual) ${metadataEntry.name}`,
          })) ?? []),
          ...(entry.expected.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(expected) ${metadataEntry.name}`,
          })) ?? []),
        ];
      }
    }

    return [];
  }, [report, selectedId]);

  return <MetadataList metadata={metadata} />;
};
