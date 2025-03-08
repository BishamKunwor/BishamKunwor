import {
  type QueryClient,
  useQuery,
  type DefaultError,
  type QueryKey,
  type QueryFilters,
  type FetchQueryOptions,
  type RefetchOptions,
  type RefetchQueryFilters,
  SetDataOptions,
  Updater,
  InvalidateQueryFilters,
  InvalidateOptions,
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
    filters?: Omit<TQueryFilters, "queryKey">
  ) =>
    factoryQueryClient.getQueriesData({
      ...filters,
      queryKey: getStringArrFromQueryKey(
        // @ts-ignore
        getQueryKey()
      ),
    }) as Array<[TQueryKey, TInferredQueryFnData | undefined]>;

  queryIntance.prefetchQuery = (
    options: Omit<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    > &
      TParams extends undefined
      ? {}
      : { params: TParams }
  ) =>
    factoryQueryClient.prefetchQuery({
      ...factoryOptions,
      ...options,
      // @ts-ignore
      queryKey: getQueryKey({
        // @ts-ignore
        params: options?.params,
      }),
      // @ts-ignore
      queryFn: (props) =>
        // @ts-ignore
        factoryOptions.queryFn({
          ...props,
          // @ts-ignore
          params: options?.params,
        }),
    });

  queryIntance.refetchQuery = (
    filters?: Omit<
      RefetchQueryFilters<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "exact"
    > &
      TParams extends undefined
      ? {}
      : { params: TParams },
    options?: RefetchOptions
  ) =>
    factoryQueryClient.refetchQueries(
      {
        ...filters,
        exact: true,
        // @ts-ignore
        queryKey: getQueryKey({ params: filters?.params as TParams }),
      },
      options
    );

  queryIntance.refetchAllQueries = (
    filters?: Omit<
      RefetchQueryFilters<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey"
    >,
    options?: RefetchOptions
  ) =>
    factoryQueryClient.refetchQueries(
      {
        ...filters,
        // @ts-ignore
        queryKey: getStringArrFromQueryKey(
          // @ts-ignore
          getQueryKey()
        ),
      },
      options
    );

  queryIntance.setQueryData = (
    options: {
      updater: Updater<NoInfer<TData> | undefined, NoInfer<TData> | undefined>;
      options?: SetDataOptions;
    } & (TParams extends undefined ? {} : { params: TParams })
  ) =>
    factoryQueryClient.setQueryData<TData, TQueryKey>(
      // @ts-ignore
      getQueryKey({
        // @ts-ignore
        params: options?.params as TParams,
      }),
      options.updater as any,
      options.options
    );

  queryIntance.setQueriesData = <
    TQueryFilters extends QueryFilters<any, any, any, any> = QueryFilters<
      TQueryFnData,
      TError,
      TData,
      TQueryKey
    >
  >(options: {
    filters: Omit<TQueryFilters, "queryKey"> &
      (TParams extends undefined ? {} : { params: TParams });
    updater: Updater<NoInfer<TData> | undefined, NoInfer<TData> | undefined>;
    options?: SetDataOptions;
  }) =>
    factoryQueryClient.setQueriesData(
      {
        ...options.filters,
        queryKey:
          // @ts-ignore
          getQueryKey(options.filters.params as TParams),
      },
      // @ts-ignore
      options.updater,
      options.options
    );

  queryIntance.invalidateQuery = (
    filters?: Omit<
      InvalidateQueryFilters<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "exact"
    > &
      (TParams extends undefined ? {} : { params: TParams }),
    options?: InvalidateOptions
  ) =>
    factoryQueryClient.invalidateQueries(
      // @ts-ignore
      {
        ...filters,
        exact: true,
        // @ts-ignore
        queryKey: getQueryKey(),
      },
      options
    );

  queryIntance.invalidateAllQueries = (
    filters?: Omit<
      InvalidateQueryFilters<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey"
    >,
    options?: InvalidateOptions
  ) =>
    factoryQueryClient.invalidateQueries(
      {
        ...filters,
        // @ts-ignore
        queryKey: getStringArrFromQueryKey(
          // @ts-ignore
          getQueryKey()
        ),
      },
      options
    );

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
    >
  ) =>
    factoryQueryClient.removeQueries({
      ...filters,
      // @ts-ignore
      queryKey: getStringArrFromQueryKey(
        // @ts-ignore
        getQueryKey()
      ),
    });

  return queryIntance;
}
