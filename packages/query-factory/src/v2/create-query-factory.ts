import { DefaultError, NoInfer, QueryClient, QueryKey } from "@tanstack/react-query";
import { createQuery } from "./create-query";
import { CreateQueryOptionsWithParams, CreateQueryOptionsWithoutParams, CreateQueryWithPramsResult, CreateQueryWithoutParamsResult } from "./types";

export const createQueryFactory = (queryClient: QueryClient) => {
    function createBaseQuery<
        TQueryFnData = unknown,
        TError = DefaultError,
        TData = TQueryFnData,
        TQueryKey extends QueryKey = QueryKey
    >(factoryOptions: CreateQueryOptionsWithoutParams<TQueryFnData, TError, TData, TQueryKey>): CreateQueryWithoutParamsResult<NoInfer<TQueryFnData>, NoInfer<TError>, NoInfer<TData>, NoInfer<TQueryKey>>
    function createBaseQuery<
        TQueryFnData = unknown,
        TError = DefaultError,
        TData = TQueryFnData,
        TQueryKey extends QueryKey = QueryKey,
        TParams extends object = object
    >(factoryOptions: CreateQueryOptionsWithParams<TQueryFnData, TError, TData, TQueryKey, TParams>): CreateQueryWithPramsResult<NoInfer<TQueryFnData>, NoInfer<TError>, NoInfer<TData>, NoInfer<TQueryKey>, NoInfer<TParams>>
    function createBaseQuery(factoryOptions: CreateQueryOptionsWithParams | CreateQueryOptionsWithoutParams) {
        return createQuery(factoryOptions, queryClient)
    }

    return createBaseQuery;
}


