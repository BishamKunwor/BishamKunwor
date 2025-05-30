/* eslint-disable react-hooks/rules-of-hooks */
import {
  QueryClient,
  queryOptions,
  useQuery,
  type DefaultError,
  type DefinedInitialDataOptions,
  type FetchQueryOptions,
  type InvalidateOptions,
  type InvalidateQueryFilters,
  type OmitKeyof,
  type QueryFilters,
  type QueryKey,
  type RefetchOptions,
  type RefetchQueryFilters,
  type SetDataOptions,
  type UndefinedInitialDataOptions,
  type UnusedSkipTokenOptions,
} from "@tanstack/react-query";
import type {
  GetFactoryQueryOptionsWithoutParams,
  GetFactoryQueryOptionsWithParams,
  GetFactoryQueryReturnWithoutParams,
  GetFactoryQueryReturnWithParams,
  QueryFunctionContextObj,
} from "./types";

export function createQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  factoryOptions: GetFactoryQueryOptionsWithoutParams<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    DefinedInitialDataOptions
  >,
  factoryQueryClient: QueryClient
): GetFactoryQueryReturnWithoutParams<TQueryFnData, TError, TQueryKey>;

export function createQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  factoryOptions: GetFactoryQueryOptionsWithoutParams<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    UnusedSkipTokenOptions
  >,
  factoryQueryClient: QueryClient
): GetFactoryQueryReturnWithoutParams<TQueryFnData, TError, TQueryKey>;

export function createQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  factoryOptions: GetFactoryQueryOptionsWithoutParams<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    UndefinedInitialDataOptions
  >,

  factoryQueryClient: QueryClient
): GetFactoryQueryReturnWithoutParams<TQueryFnData, TError, TQueryKey>;

export function createQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, unknown> | undefined = undefined
>(
  factoryOptions: GetFactoryQueryOptionsWithParams<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    DefinedInitialDataOptions,
    TParams
  >,
  factoryQueryClient: QueryClient
): GetFactoryQueryReturnWithParams<TQueryFnData, TError, TQueryKey, TParams>;

export function createQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, unknown> | undefined = undefined
>(
  factoryOptions: GetFactoryQueryOptionsWithParams<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    UnusedSkipTokenOptions,
    TParams
  >,
  factoryQueryClient: QueryClient
): GetFactoryQueryReturnWithParams<TQueryFnData, TError, TQueryKey, TParams>;

export function createQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, unknown> | undefined = undefined
>(
  factoryOptions: GetFactoryQueryOptionsWithParams<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    UndefinedInitialDataOptions,
    TParams
  >,

  factoryQueryClient: QueryClient
): GetFactoryQueryReturnWithParams<TQueryFnData, TError, TQueryKey, TParams>;

export function createQuery(
  factoryOptions:
    | GetFactoryQueryOptionsWithoutParams
    | GetFactoryQueryOptionsWithParams,
  factoryQueryClient: QueryClient
) {
  const isWithOutQueryKey = (
    value: unknown
  ): value is GetFactoryQueryOptionsWithoutParams => {
    return factoryOptions.queryKey.length === 0;
  };

  const isWithQueryKey = (
    value: unknown
  ): value is GetFactoryQueryOptionsWithParams => {
    return factoryOptions.queryKey.length > 0;
  };

  const getStringArrFromQueryKey = (queryKey: unknown) => {
    if (!Array.isArray(queryKey)) {
      return [];
    }

    let sliceEndIndex = queryKey.length;

    for (const key of queryKey) {
      if (typeof key !== "string") {
        sliceEndIndex = queryKey.indexOf(key);
        break;
      }
    }

    return queryKey.slice(0, sliceEndIndex);
  };

  const getQueryKey = (params: { params: unknown }) => {
    if (isWithQueryKey(factoryOptions) && params) {
      return factoryOptions.queryKey(params.params as undefined);
    }

    if (isWithOutQueryKey(factoryOptions)) {
      return factoryOptions.queryKey();
    }

    throw new Error("Invalid query key");
  };

  const getQueryFn = (
    params:
      | QueryFunctionContextObj
      | (QueryFunctionContextObj & { params: unknown })
  ) => {
    if (isWithQueryKey(factoryOptions) && "params" in params) {
      return factoryOptions.queryFn({
        ...params,
        params: params.params as undefined,
      });
    }

    if (isWithOutQueryKey(factoryOptions)) {
      return factoryOptions.queryFn(params);
    }

    throw new Error("Invalid query fn");
  };

  const getQueryOptions = (
    options?: OmitKeyof<
      | GetFactoryQueryOptionsWithoutParams
      | (GetFactoryQueryOptionsWithParams & {
          params: unknown;
        }),
      "queryFn" | "queryKey"
    >
  ) => {
    if (isWithOutQueryKey(factoryOptions) && isWithOutQueryKey(options)) {
      return queryOptions({
        ...factoryOptions,
        ...options,
        queryKey: getQueryKey({ params: undefined }),
        queryFn: getQueryFn,
      });
    }

    if (
      isWithQueryKey(factoryOptions) &&
      isWithQueryKey(options) &&
      "params" in options
    ) {
      return queryOptions({
        ...factoryOptions,
        ...options,
        queryKey: getQueryKey({ params: options.params }),
        queryFn: (params) => getQueryFn({ ...params, params: options.params }),
      });
    }

    throw new Error("Invalid query options");
  };

  const queryInstance = (options?: Parameters<typeof getQueryOptions>[0]) =>
    useQuery(getQueryOptions(options), factoryQueryClient);

  const getQueryData = (params?: { params: unknown }) =>
    factoryQueryClient.getQueryData(getQueryKey({ params: params?.params }));

  const getQueriesData = (params?: OmitKeyof<QueryFilters, "queryKey">) =>
    factoryQueryClient.getQueriesData({
      ...params,
      queryKey: getStringArrFromQueryKey(getQueryKey({ params: undefined })),
    });

  const setQueryData = (params: {
    params: unknown;
    updater: unknown;
    options?: SetDataOptions;
  }) =>
    factoryQueryClient.setQueryData(
      getQueryKey({ params: params.params }),
      params.updater,
      params.options
    );

  const removeQueryData = (
    params?: OmitKeyof<QueryFilters, "queryKey" | "exact"> & {
      params?: unknown;
    }
  ) =>
    factoryQueryClient.removeQueries({
      ...params,
      queryKey: getQueryKey({ params: params?.params }),
      exact: true,
    });

  const removeAllQueriesData = (params?: OmitKeyof<QueryFilters, "queryKey">) =>
    factoryQueryClient.removeQueries({
      ...params,
      queryKey: getStringArrFromQueryKey(
        getQueryKey({ params: undefined })
      ) as QueryKey,
    });

  const invalidateQuery = async (invalidateQueryParams?: {
    filters?: OmitKeyof<InvalidateQueryFilters, "queryKey" | "exact">;
    params?: unknown;
    options?: InvalidateOptions;
  }) => {
    const { filters = {}, params, options = {} } = invalidateQueryParams ?? {};

    const queryKey = getQueryKey({ params });

    await factoryQueryClient.invalidateQueries(
      { ...filters, exact: true, queryKey },
      options
    );

    return getQueryData({ params });
  };

  const invalidateAllQueries = async (invalidateAllQueriesParams?: {
    filters?: OmitKeyof<InvalidateQueryFilters, "queryKey">;
    options?: InvalidateOptions;
  }) => {
    const { filters = {}, options = {} } = invalidateAllQueriesParams ?? {};

    await factoryQueryClient.invalidateQueries(
      {
        ...filters,
        queryKey: getStringArrFromQueryKey(
          getQueryKey({ params: undefined })
        ) as QueryKey,
      },
      options
    );

    return getQueriesData();
  };

  const prefetch = async (
    options?: OmitKeyof<FetchQueryOptions, "queryKey" | "queryFn"> & {
      params: unknown;
    }
  ) => {
    await factoryQueryClient.prefetchQuery(getQueryOptions(options));

    return getQueryData({ params: options?.params });
  };

  const refetchQuery = async (refetchQueryOptions?: {
    filters?: RefetchQueryFilters;
    params?: unknown;
    options?: RefetchOptions;
  }) => {
    const { filters = {}, params, options = {} } = refetchQueryOptions ?? {};

    const queryKey = getQueryKey({ params });

    await factoryQueryClient.refetchQueries(
      { ...filters, queryKey, exact: true },
      options
    );

    return getQueryData({ params });
  };

  const refetchAllQueries = async (refetchAllQueriesParams?: {
    filters?: RefetchQueryFilters;
    options?: RefetchOptions;
  }) => {
    const { filters = {}, options = {} } = refetchAllQueriesParams ?? {};

    const queryKey = getStringArrFromQueryKey(
      getQueryKey({ params: undefined })
    );

    await factoryQueryClient.refetchQueries(
      {
        ...filters,
        queryKey: queryKey as QueryKey,
      },
      options
    );

    return getQueriesData();
  };

  queryInstance.getQueryKey = getQueryKey;
  queryInstance.getQueryOptions = getQueryOptions;

  queryInstance.getQueryData = getQueryData;
  queryInstance.getQueriesData = getQueriesData;

  queryInstance.setQueryData = setQueryData;

  queryInstance.removeQueryData = removeQueryData;
  queryInstance.removeAllQueriesData = removeAllQueriesData;

  queryInstance.invalidateQuery = invalidateQuery;
  queryInstance.invalidateAllQueries = invalidateAllQueries;

  queryInstance.refetchQuery = refetchQuery;
  queryInstance.refetchAllQueries = refetchAllQueries;

  queryInstance.prefetch = prefetch;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return queryInstance as (options: any) => any;
}
