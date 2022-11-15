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
  items?: ReportItem[];
};

export type BaseReportEntry<TResource extends Resource> = {
  id: string;
  groupId: string;
  tags: string[];
  path: string;
  metadata?: Metadata<TResource>[];
};
export type ReportImageTestEntry<TResource extends Resource> =
  BaseReportEntry<TResource> & {
    type: "image";
    image: TResource;
  };
export type ReportCodeTestEntry<TResource extends Resource> =
  BaseReportEntry<TResource> & {
    type: "code";
    code: TResource;
  };
export type ReportImageComparison<TResource extends Resource> = {
  type: "image";
  similarity: number;
  normalizedExpected: TResource;
  normalizedActual: TResource;
  diff: TResource;
  overlap: TResource;
};
export type ReportCodeComparison<TResource extends Resource> = {
  type: "code";
  similarity: number;
  diff?: TResource;
};

export type BaseMetadata = {
  name: string;
  description?: string;
};
export type TextMetadata = BaseMetadata & {
  type: "text";
  text: string;
};
export type LinkMetadata = BaseMetadata & {
  type: "link";
  url: string;
};
export type ImageMetadata<TResource extends Resource> = BaseMetadata & {
  type: "image";
  image: TResource;
};
export type CodeMetadata<TResource extends Resource> = BaseMetadata & {
  type: "code";
  code: TResource;
};
export type FileMetadata<TResource extends Resource> = BaseMetadata & {
  type: "file";
  file: TResource;
};
export type Metadata<TResource extends Resource> =
  | TextMetadata
  | LinkMetadata
  | ImageMetadata<TResource>
  | CodeMetadata<TResource>
  | FileMetadata<TResource>;

// Regression

export type BaseRegressionReport<TResource extends Resource> = BaseReport & {
  type: "regression";
  baseCommitHash: string;
  results: RegressionReportResults<TResource>;
};

export type BaseRegressionReportResults<
  TResource extends Resource,
  TEntry extends RegressionTestEntry<TResource>,
  TPair extends RegressionTestPair<TResource>
> = {
  new: TEntry[];
  removed: TEntry[];
  unchanged: TPair[];
  changed: TPair[];
};

export type ImageRegressionReportResults<TResource extends Resource> =
  BaseRegressionReportResults<
    TResource,
    ImageRegressionTestEntry<TResource>,
    ImageRegressionTestPair<TResource>
  > & {
    type: "image";
  };

export type CodeRegressionReportResults<TResource extends Resource> =
  BaseRegressionReportResults<
    TResource,
    CodeRegressionTestEntry<TResource>,
    CodeRegressionTestPair<TResource>
  > & {
    type: "code";
  };
export type RegressionReportResults<TResource extends Resource> =
  | ImageRegressionReportResults<TResource>
  | CodeRegressionReportResults<TResource>;

export type BaseRegressionTestPair<
  TResource extends Resource,
  TEntry extends RegressionTestEntry<TResource>,
  TComparison
> = {
  expected: TEntry;
  actual: TEntry;
  comparison: TComparison;
};

export type ImageRegressionTestPair<TResource extends Resource> =
  BaseRegressionTestPair<
    TResource,
    ImageRegressionTestEntry<TResource>,
    ReportImageComparison<TResource>
  > & {
    type: "image";
  };

export type CodeRegressionTestPair<TResource extends Resource> =
  BaseRegressionTestPair<
    TResource,
    CodeRegressionTestEntry<TResource>,
    ReportCodeComparison<TResource>
  > & {
    type: "code";
  };

export type RegressionTestPair<TResource extends Resource> =
  | ImageRegressionTestPair<TResource>
  | CodeRegressionTestPair<TResource>;

export type ImageRegressionTestEntry<TResource extends Resource> =
  ReportImageTestEntry<TResource>;
export type CodeRegressionTestEntry<TResource extends Resource> =
  ReportCodeTestEntry<TResource>;
export type RegressionTestEntry<TResource extends Resource> =
  | ImageRegressionTestEntry<TResource>
  | CodeRegressionTestEntry<TResource>;

export type LocalRegressionTestPair = RegressionTestPair<LocalResource>;
export type HostedRegressionTestPair = RegressionTestPair<HostedResource>;
export type LocalRegressionTestEntry = RegressionTestEntry<LocalResource>;
export type HostedRegressionTestEntry = RegressionTestEntry<HostedResource>;

export type LocalRegressionReport = BaseRegressionReport<LocalResource>;
export type HostedRegressionReport = BaseRegressionReport<HostedResource>;
export type RegressionReport = LocalRegressionReport | HostedRegressionReport;

// Fidelity

export type BaseFidelityReport<TResource extends Resource> = BaseReport & {
  type: "fidelity";
  overallFidelityScore: number;
  pairs: FidelityTestPair<TResource>[];
};

export type BaseFidelityTestPair<
  TResource extends Resource,
  TEntry extends FidelityTestEntry<TResource>,
  TComparison
> = {
  outcome: "success" | "failure";
  expected: TEntry;
  actual: TEntry;
  comparison: TComparison;
};

export type ImageFidelityTestPair<TResource extends Resource> =
  BaseFidelityTestPair<
    TResource,
    ImageFidelityTestEntry<TResource>,
    ReportImageComparison<TResource>
  > & {
    type: "image";
  };

export type CodeFidelityTestPair<TResource extends Resource> =
  BaseFidelityTestPair<
    TResource,
    CodeFidelityTestEntry<TResource>,
    ReportCodeComparison<TResource>
  > & {
    type: "code";
  };

export type FidelityTestPair<TResource extends Resource> =
  | ImageFidelityTestPair<TResource>
  | CodeFidelityTestPair<TResource>;

export type ImageFidelityTestEntry<TResource extends Resource> =
  ReportImageTestEntry<TResource>;
export type CodeFidelityTestEntry<TResource extends Resource> =
  ReportCodeTestEntry<TResource>;
export type FidelityTestEntry<TResource extends Resource> =
  | ImageFidelityTestEntry<TResource>
  | CodeFidelityTestEntry<TResource>;

export type LocalFidelityTestPair = FidelityTestPair<LocalResource>;
export type HostedFidelityTestPair = FidelityTestPair<HostedResource>;
export type LocalFidelityTestEntry = FidelityTestEntry<LocalResource>;
export type HostedFidelityTestEntry = FidelityTestEntry<HostedResource>;

export type LocalFidelityReport = BaseFidelityReport<LocalResource>;
export type HostedFidelityReport = BaseFidelityReport<HostedResource>;
export type FidelityReport = LocalFidelityReport | HostedFidelityReport;

export type Report = RegressionReport | FidelityReport;
export type LocalReport = LocalRegressionReport | LocalFidelityReport;
export type HostedReport = HostedRegressionReport | HostedFidelityReport;

export type Summary = {
  result: "success" | "failure";
  stats: SummaryStatistic[];
};

export type BaseStatistic = {
  name: string;
  description?: string;
  sentiment: Sentiment;
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

export type Sentiment = "success" | "danger" | "warning" | "info";

export type ReportItem = {
  id: string;
  hash: string;
  status: ReportItemStatus;
};

export type ReportItemStatus = "success" | "failure";

export type Review = {
  approvals: ReviewApproval[];
  rejections: ReviewRejection[];
};

export type ReviewApproval = {
  report: string;
  id: string;
  hash: string;
  createdAt: number;
  commitHash: string;
};

export type ReviewRejection = {
  report: string;
  id: string;
  hash: string;
  createdAt: number;
  commitHash: string;
};

export type CommitStatusOverview = {
  createdAt: number;
  reports: Record<string, CommitReportStatusOverview>;
};

export type CommitReportStatusOverview = {
  status: CommitReportStatus;
  message: string;
};

export type CommitReportStatus =
  | "success"
  | "failure"
  | "approved"
  | "changes_requested";

// Global

export type GlobalEnvironmentSetup = {
  s3?: {
    bucket: string;
    region: string;
  };
  restApi?: {
    baseUrl: string;
    accessToken: string;
  };
  zipArchive?: {
    buffer: ArrayBuffer;
  };
};
