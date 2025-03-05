import {
  type QueryClient,
  useQuery,
  type DefaultError,
  type QueryKey,
} from "@tanstack/react-query";

import type { QueryInstanceProps, QueryOptionsObj } from "./types";

export default function createQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, any> | undefined = undefined
>(
  factoryOptions: Omit<
    QueryOptionsObj<TQueryFnData, TError, TData, TQueryKey, TParams>,
    "select"
  >,
  factoryQueryClient: QueryClient
) {
  const queryIntance = <TData = TQueryFnData>(
    ...[queryInstanceOptions, queryClient]: QueryInstanceProps<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TParams
    >
  ) =>
    useQuery<TQueryFnData, TError, TData, TQueryKey>(
      {
        ...factoryOptions,
        ...queryInstanceOptions,
        queryFn: (props) =>
          // @ts-ignore
          factoryOptions.queryFn({
            ...props,
            // @ts-ignore
            params: queryInstanceOptions?.params,
          }),
        // @ts-ignore
        queryKey: factoryOptions.queryKey(queryInstanceOptions?.params),
      },
      factoryQueryClient ?? queryClient
    );

  queryIntance.getQueryKey = (
    ...queryKeyParams: TParams extends undefined
      ? []
      : [queryParams: { params: TParams }]
  ) =>
    factoryOptions.queryKey(
      // @ts-expect-error
      queryKeyParams[0]?.params
    );

  return queryIntance;
}
