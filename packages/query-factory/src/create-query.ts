import {
  type QueryClient,
  useQuery,
  type DefaultError,
  type QueryKey,
  QueryFilters,
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
  const getQueryKey = (
    ...[queryKeyParams]: TParams extends undefined
      ? []
      : [queryParams: { params: TParams }]
  ) => factoryOptions.queryKey(queryKeyParams?.params as TParams);

  const getStringArrFromQueryKey = (queryKey: TQueryKey) => {
    let sliceEndIndex = queryKey.length;

    for (const key of queryKey) {
      if (typeof key !== "string") {
        sliceEndIndex = queryKey.indexOf(key);
        break;
      }
    }

    return queryKey.slice(0, sliceEndIndex);
  };

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
        // @ts-ignore
        queryKey: getQueryKey({
          // @ts-ignore
          params: queryInstanceOptions?.params,
        }),
        queryFn: (props) =>
          // @ts-ignore
          factoryOptions.queryFn({
            ...props,
            // @ts-ignore
            params: queryInstanceOptions?.params,
          }),
      },
      factoryQueryClient ?? queryClient
    );

  queryIntance.getQueryKey = getQueryKey;

  queryIntance.getQueryOptions = (
    ...[queryInstanceOptions]: QueryInstanceProps<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TParams
    >
  ) => ({
    ...factoryOptions,
    ...queryInstanceOptions,
    // @ts-ignore
    queryKey: getQueryKey({
      // @ts-ignore
      params: queryInstanceOptions?.params,
    }),
    // @ts-ignore
    queryFn: (props) =>
      // @ts-ignore
      factoryOptions.queryFn({
        ...props,
        // @ts-ignore
        params: queryInstanceOptions?.params,
      }),
  });

  queryIntance.getQueryData = (
    ...[queryKeyParams]: TParams extends undefined
      ? []
      : [queryParams: { params: TParams }]
  ) =>
    factoryQueryClient.getQueryData<TData, TQueryKey>(
      // @ts-ignore
      getQueryKey(queryKeyParams)
    );

  queryIntance.getAllQueryData = <
    TQueryFilters extends QueryFilters<any, any, any, any> = QueryFilters<
      TQueryFnData,
      TError,
      TData,
      TQueryKey
    >,
    TInferredQueryFnData = TQueryFilters extends QueryFilters<
      infer TData,
      any,
      any,
      any
    >
      ? TData
      : TQueryFnData
  >(
    filters?: Omit<TQueryFilters, "queryKey"> & TParams extends undefined
      ? {}
      : { params: TParams }
  ) =>
    factoryQueryClient.getQueriesData({
      ...filters,
      queryKey: getStringArrFromQueryKey(
        // @ts-ignore
        getQueryKey({
          // @ts-ignore
          params: filters?.params as TParams,
        })
      ),
    }) as Array<[TQueryKey, TInferredQueryFnData | undefined]>;

  queryIntance.prefetchQuery = () => {};

  queryIntance.refetchQuery = () => {};
  queryIntance.refetchAllQueries = () => {};

  queryIntance.setQueryData = () => {};
  queryIntance.setQueriesData = () => {};

  queryIntance.invalidateQuery = () => {};
  queryIntance.invalidateAllQueries = () => {};

  queryIntance.removeQueryData = (
    filters?: Omit<
      QueryFilters<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey"
    > &
      TParams extends undefined
      ? {}
      : { params: TParams }
  ) =>
    factoryQueryClient.removeQueries({
      ...filters,
      exact: true,
      // @ts-ignore
      queryKey: getQueryKey({ params: filters?.params as TParams }),
    });

  queryIntance.removeAllQueries = (
    filters?: Omit<
      QueryFilters<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey"
    > &
      TParams extends undefined
      ? {}
      : { params: TParams }
  ) =>
    factoryQueryClient.removeQueries({
      ...filters,
      // @ts-ignore
      queryKey: getStringArrFromQueryKey(
        // @ts-ignore
        getQueryKey({
          // @ts-ignore
          params: filters?.params as TParams,
        })
      ),
    });

  return queryIntance;
}
