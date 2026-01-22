import type { DataTag, DefaultError, NoInfer, OmitKeyof, QueryClient, QueryFunction, QueryFunctionContext, QueryKey, QueryOptions, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"


export type CreateQueryOptionsWithParams<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TParams extends object = object
> = OmitKeyof<QueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'> & {
    queryKey: (params: TParams) => TQueryKey
    queryFn: (params: QueryFunctionContext<TQueryKey> & { params: TParams }) => TQueryFnData | Promise<TQueryFnData>
}

export type CreateQueryOptionsWithoutParams<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
> = OmitKeyof<QueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'> & {
    queryKey: () => TQueryKey
    queryFn: QueryFunction<TQueryFnData, TQueryKey>
}

// Result Types

declare const getQueryDataInstance: QueryClient['getQueryData']
declare const setQueryDataInstance: QueryClient['setQueryData']

export type CreateQueryWithPramsResult<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TParams extends object = object
> = {
    (options: OmitKeyof<UseQueryOptions, "queryKey" | "queryFn"> & { params: TParams }): UseQueryResult<NoInfer<TData>, TError>
    getQueryKey: (props: { params: TParams }) => DataTag<TQueryKey, TQueryFnData, TError>
    getQueryOptions: (options: OmitKeyof<UseQueryOptions, "queryKey" | "queryFn"> & { params: TParams }) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    getQueryData: (props: { params: TParams }) => typeof getQueryDataInstance<TQueryFnData, DataTag<TQueryKey, TQueryFnData, TError>>
    prefetchQuery: (options: OmitKeyof<UseQueryOptions, "queryKey" | "queryFn"> & { params: TParams }) => Promise<NoInfer<TData> | undefined>
}


export type CreateQueryWithoutParamsResult<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
> = {
    (options?: OmitKeyof<UseQueryOptions, "queryKey" | "queryFn">): UseQueryResult<NoInfer<TData>, TError>
    getQueryKey: () => DataTag<TQueryKey, TQueryFnData, TError>
    getQueryOptions: (options?: OmitKeyof<UseQueryOptions, "queryKey" | "queryFn">) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    getQueryData: () => typeof getQueryDataInstance<TQueryFnData, DataTag<TQueryKey, TQueryFnData, TError>>
    setQueryData: () => typeof setQueryDataInstance<TQueryFnData, DataTag<TQueryKey, TQueryFnData, TError>>
    prefetchQuery: (options: OmitKeyof<UseQueryOptions, "queryKey" | "queryFn">) => Promise<NoInfer<TData> | undefined>
}