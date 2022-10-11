export type LocalResource = {
  type: "local";
  path: string;
};
export type HostedResource = {
  type: "hosted";
  url: string;
};
export type Resource = LocalResource | HostedResource;

export type BaseReport = {
  name: string;
  createdAt: number;
  commitHash: string;
  summary: Summary;
};

export type BaseRegressionReport<TResource extends Resource> = BaseReport & {
  type: "regression";
  baseCommitHash: string;
  results: RegressionReportResults<TResource>;
};

export type RegressionReportResults<TResource extends Resource> = {
  new: RegressionTestEntry<TResource>[];
  removed: RegressionTestEntry<TResource>[];
  unchanged: RegressionTestPair<TResource>[];
  changed: RegressionTestPair<TResource>[];
};

export type RegressionTestPair<TResource extends Resource> = {
  expected: RegressionTestEntry<TResource>;
  actual: RegressionTestEntry<TResource>;
  comparison: {
    similarity: number;
    normalizedExpected: TResource;
    normalizedActual: TResource;
    diff: TResource;
    overlap: TResource;
  };
};

export type RegressionTestEntry<TResource extends Resource> = {
  id: string;
  groupId: string;
  tags: string[];
  image: TResource;
};
export type LocalRegressionTestPair = RegressionTestPair<LocalResource>;
export type HostedRegressionTestPair = RegressionTestPair<HostedResource>;
export type LocalRegressionTestEntry = RegressionTestEntry<LocalResource>;
export type HostedRegressionTestEntry = RegressionTestEntry<HostedResource>;

export type LocalRegressionReport = BaseRegressionReport<LocalResource>;
export type HostedRegressionReport = BaseRegressionReport<HostedResource>;
export type RegressionReport = LocalRegressionReport | HostedRegressionReport;

export type Report = RegressionReport;
export type HostedReport = HostedRegressionReport;

export type Summary = {
  result: "success" | "failure";
  stats: SummaryStatistic[];
};

export type BaseStatistic = {
  name: string;
  description?: string;
  sentiment: "success" | "danger" | "warning" | "info";
};

export type GaugeStatistic = BaseStatistic & {
  type: "gauge";
  value: number;
};

export type FractionStatistic = BaseStatistic & {
  type: "fraction";
  numerator: number;
  denominator: number;
};

export type SummaryStatistic = GaugeStatistic | FractionStatistic;
