import useSWR from "swr";
import {
  APIRequest,
  APIRequestParams,
  APIResponse,
  ScoobyWebAPI,
} from "../../api";
import { useAPI } from "../../api/provider";

export type QueryResponse<TData> = {
  data?: TData;
  error?: unknown;
  isLoading?: boolean;
};

export type APIQueryResponse<TRequest extends APIRequest> = QueryResponse<
  APIResponse<TRequest>
>;

export function useQuery<TRequest extends APIRequest>(
  request: TRequest | null,
  params: APIRequestParams<TRequest>
): APIQueryResponse<TRequest> {
  const { api } = useAPI();
  const { data, error, isValidating } = useSWR(
    serializeRequest(request, params),
    buildFetcher(api),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    error,
    isLoading: isValidating,
  };
}

type PackedRequest<TRequest extends APIRequest> = {
  request: APIRequest;
  params: APIRequestParams<TRequest>;
};

function serializeRequest<TRequest extends APIRequest>(
  request: TRequest | null,
  params: APIRequestParams<TRequest>
): string | null {
  if (!request) {
    return null;
  }

  return JSON.stringify({
    request,
    params,
  } as PackedRequest<TRequest>);
}

function buildFetcher(api: ScoobyWebAPI) {
  return async function fetcher(
    serializedRequest: string
  ): Promise<APIResponse<any>> {
    const deserializedRequest: PackedRequest<any> =
      JSON.parse(serializedRequest);

    if (!api[deserializedRequest.request]) {
      throw new Error(`unknown request: ${deserializedRequest.request}`);
    }

    return api[deserializedRequest.request](deserializedRequest.params as any);
  };
}
