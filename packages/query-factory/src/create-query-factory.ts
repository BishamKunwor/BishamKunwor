import {
  DefaultError,
  DefinedInitialDataOptions,
  QueryClient,
  QueryKey,
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
} from "@tanstack/react-query";
import { createQuery } from "./create-query";
import {
  GetFactoryQueryOptionsWithoutParams,
  GetFactoryQueryOptionsWithParams,
  GetFactoryQueryReturnWithoutParams,
  GetFactoryQueryReturnWithParams,
} from "./types";

export function createQueryFactory(queryClient: QueryClient) {
  function createAppQuery<
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
    >
  ): GetFactoryQueryReturnWithoutParams<TQueryFnData, TError, TQueryKey>;

  function createAppQuery<
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
    >
  ): GetFactoryQueryReturnWithoutParams<TQueryFnData, TError, TQueryKey>;

  function createAppQuery<
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
    >
  ): GetFactoryQueryReturnWithoutParams<TQueryFnData, TError, TQueryKey>;

  function createAppQuery<
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
    >
  ): GetFactoryQueryReturnWithParams<TQueryFnData, TError, TQueryKey, TParams>;

  function createAppQuery<
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

  function createAppQuery<
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
    >
  ): GetFactoryQueryReturnWithParams<TQueryFnData, TError, TQueryKey, TParams>;

  function createAppQuery(
    options:
      | GetFactoryQueryOptionsWithParams
      | GetFactoryQueryOptionsWithoutParams
  ) {
    return createQuery(options, queryClient);
  }

  return createAppQuery;
}
