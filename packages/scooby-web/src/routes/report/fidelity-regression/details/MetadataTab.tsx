import {
  HostedFidelityRegressionReport,
  HostedResource,
  Metadata,
} from "@animaapp/scooby-shared";
import { useMemo } from "react";
import { MetadataList } from "../../../../components/MetadataList";

type Props = {
  selectedId: string | undefined;
  report: HostedFidelityRegressionReport;
};

export const MetadataTab = ({ selectedId, report }: Props) => {
  const metadata: Metadata<HostedResource>[] = useMemo(() => {
    if (!selectedId) {
      return [];
    }

    for (const entry of report.results.new) {
      if (entry.actual.id === selectedId) {
        return [
          ...(entry.actual.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(actual) ${metadataEntry.name}`,
          })) ?? []),
          ...(entry.expected.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(truth) ${metadataEntry.name}`,
          })) ?? []),
        ];
      }
    }

    for (const entry of report.results.removed) {
      if (entry.id === selectedId) {
        return [
          ...(entry.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(removed) ${metadataEntry.name}`,
          })) ?? []),
        ];
      }
    }

    for (const entry of [
      ...report.results.unchanged,
      ...report.results.changed,
    ]) {
      if (entry.actual.id === selectedId) {
        return [
          ...(entry.actual.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(actual) ${metadataEntry.name}`,
          })) ?? []),
          ...(entry.expected.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(truth) ${metadataEntry.name}`,
          })) ?? []),
          ...(entry.reference.metadata?.map((metadataEntry) => ({
            ...metadataEntry,
            name: `(reference) ${metadataEntry.name}`,
          })) ?? []),
        ];
      }
    }

    return [];
  }, [report, selectedId]);

  return <MetadataList metadata={metadata} />;
};
