export type MatchableSource = {
  id: string;
  groupId: string;
};

export type MatchedPair<T extends MatchableSource> = {
  expected: T;
  actual: T;
};

export type MatchedSources<T extends MatchableSource> = {
  new: T[];
  matching: MatchedPair<T>[];
  removed: T[];
};
