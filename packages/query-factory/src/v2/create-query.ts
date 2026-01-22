import { DefaultError, InvalidateOptions, InvalidateQueryFilters, NoInfer, OmitKeyof, QueryClient, QueryFilters, QueryFunction, QueryFunctionContext, QueryKey, RefetchOptions, RefetchQueryFilters, SetDataOptions, Updater, UseQueryOptions, queryOptions, useQuery } from "@tanstack/react-query";
import type { CreateQueryOptionsWithParams, CreateQueryOptionsWithoutParams, CreateQueryWithPramsResult, CreateQueryWithoutParamsResult } from "./types";

export function createQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
>(factoryOptions: CreateQueryOptionsWithoutParams<TQueryFnData, TError, TData, TQueryKey>, queryClient: QueryClient): CreateQueryWithoutParamsResult<NoInfer<TQueryFnData>, NoInfer<TError>, NoInfer<TData>, NoInfer<TQueryKey>>
export function createQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TParams extends object = object
>(factoryOptions: CreateQueryOptionsWithParams<TQueryFnData, TError, TData, TQueryKey, TParams>, queryClient: QueryClient): CreateQueryWithPramsResult<NoInfer<TQueryFnData>, NoInfer<TError>, NoInfer<TData>, NoInfer<TQueryKey>, NoInfer<TParams>>
export function createQuery(factoryOptions: CreateQueryOptionsWithParams | CreateQueryOptionsWithoutParams, queryClient: QueryClient) {

    type PropsWithParamsType = {
        params: object | undefined
    }

    const isWithQueryKey = (value: unknown): value is CreateQueryOptionsWithParams => {
        return factoryOptions.queryKey.length > 0
    }

    const isWithOutQueryKey = (value: unknown): value is CreateQueryOptionsWithoutParams => {
        return factoryOptions.queryKey.length === 0
    }


    const getQueryKey = (props: PropsWithParamsType) => {
        if (isWithQueryKey(factoryOptions) && props.params) {
            return factoryOptions.queryKey(props.params)
        }
        if (isWithOutQueryKey(factoryOptions)) {
            return factoryOptions.queryKey()
        }
        throw new Error("Invalid query key")
    }

    const getQueryFn = (props: PropsWithParamsType & QueryFunctionContext) => {
        if (isWithQueryKey(factoryOptions) && props.params) {
            const params = props.params
            return factoryOptions.queryFn({ ...props, params })
        }

        if (isWithOutQueryKey(factoryOptions)) {
            return factoryOptions.queryFn(props)
        }

        throw new Error("Invalid query fn")
    }

    const getQueryOptions = (options: PropsWithParamsType & UseQueryOptions) => {
        return queryOptions({
            ...factoryOptions,
            ...options,
            queryKey: getQueryKey({
                params: options?.params
            }),
            queryFn: (context) => getQueryFn({ ...context, params: options?.params })
        })
    }

    const getQueryData = (props: PropsWithParamsType) => queryClient.getQueryData(getQueryKey({ params: props.params }))


    const setQueryData = (filter: {
        params: object | undefined
        updater: Updater<unknown, unknown>
        options?: SetDataOptions
    }) => {
        const queryKey = getQueryKey({ params: filter.params })
        return queryClient.setQueryData(queryKey, filter.updater, filter.options)
    }

    const removeQueryData = (filters: OmitKeyof<QueryFilters, 'queryKey'> & PropsWithParamsType) => {
        const queryKey = getQueryKey({ params: filters.params })

        const prevData = queryClient.getQueryData(queryKey)
        queryClient.removeQueries({ ...filters, queryKey })

        return prevData
    }

    const invalidateQuery = async (filters: InvalidateQueryFilters & PropsWithParamsType, options?: InvalidateOptions) => {
        await queryClient.invalidateQueries({
            ...filters,
            queryKey: getQueryKey({ params: filters?.params })
        }, options)

        return getQueryData({ params: filters?.params })
    }

    const refetchQuery = async (filters: RefetchQueryFilters & PropsWithParamsType, options?: RefetchOptions) => {
        await queryClient.refetchQueries({
            ...filters,
            queryKey: getQueryKey({ params: filters?.params })
        }, options)

        return getQueryData({ params: filters?.params })
    }

    const prefetchQuery = async (options: PropsWithParamsType & UseQueryOptions) => {
        await queryClient.prefetchQuery(getQueryOptions(options));
        return getQueryData({ params: options?.params });
    }

    const useQueryInstance = (options: PropsWithParamsType & UseQueryOptions) => useQuery(getQueryOptions(options))

    const mergeQueryMethods = (() => {
        Object.assign(useQueryInstance, {
            getQueryKey, getQueryData, setQueryData, removeQueryData, getQueryOptions, invalidateQuery, refetchQuery, prefetchQuery
        })
    })()



    return useQueryInstance;
}
