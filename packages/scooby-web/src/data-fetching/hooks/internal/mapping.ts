import { QueryResponse } from "./useQuery";

export type MappedQueryResponse<TData, TDataProperty extends string> = {
  [K in TDataProperty]?: TData;
} & Omit<QueryResponse<TData>, "data">;

export function remapQueryDataResponse<TData, TDataProperty extends string>(
  response: QueryResponse<TData>,
  as: TDataProperty
): MappedQueryResponse<TData, TDataProperty> {
  // @ts-ignore
  return {
    ...omit(response, "data"),
    [as]: response.data,
  };
}

function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  const _ = { ...obj };
  keys.forEach((key) => delete _[key]);
  return _;
}
