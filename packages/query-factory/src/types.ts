import type {
  DataTag,
  DefaultError,
  DefinedInitialDataOptions,
  FetchQueryOptions,
  InferDataFromTag,
  InvalidateOptions,
  InvalidateQueryFilters,
  OmitKeyof,
  QueryFilters,
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
  RefetchOptions,
  RefetchQueryFilters,
  SetDataOptions,
  UndefinedInitialDataOptions,
  Updater,
  UseQueryResult
} from "@tanstack/react-query";

export type QueryFunctionContextObj<TQueryKey extends QueryKey = QueryKey> =
  QueryFunctionContext<TQueryKey>;

export type GetFactoryQueryOptionsWithoutParams<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = OmitKeyof<
  UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn" | "select"
> & {
  queryKey: () => TQueryKey;
  queryFn: QueryFunction<TQueryFnData, TQueryKey>;
};

export type GetFactoryQueryOptionsWithParams<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, unknown> | undefined = undefined
> = OmitKeyof<
  UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn" | "select"
> & {
  queryKey: (params: TParams) => TQueryKey;
  queryFn: (
    params: QueryFunctionContextObj<TQueryKey> & { params: TParams }
  ) => TQueryFnData | Promise<TQueryFnData>;
};

export type GetFactoryQueryReturnWithoutParams<
  TQueryFnData = unknown,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey
> = {
  <TData = TQueryFnData>(
    options?: OmitKeyof<
      UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
  ): UseQueryResult<NoInfer<TData>, TError>;

  // <TData = TQueryFnData>(
  //   options?: OmitKeyof<
  //     DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  //     "queryKey" | "queryFn"
  //   >
  // ): DefinedUseQueryResult<NoInfer<TData>, TError>;

  getQueryKey: () => DataTag<TQueryKey, TQueryFnData, TError>;

  getQueryOptions: <TData = TQueryFnData>(
    options?: OmitKeyof<
      | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
      | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
  ) => (
    | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  ) & {
    queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
  };

  getQueryData: () => InferDataFromTag<TQueryFnData, TQueryKey> | undefined;
  getQueriesData: (
    filters?: OmitKeyof<QueryFilters, "queryKey">
  ) => Array<[TQueryKey, TQueryFnData | undefined]>;

  setQueryData: (params: {
    updater: Updater<
      NoInfer<TQueryFnData> | undefined,
      NoInfer<TQueryFnData> | undefined
    >;
    options?: SetDataOptions;
  }) => NoInfer<TQueryFnData> | undefined;

  removeQueryData: (filters?: OmitKeyof<QueryFilters, "queryKey">) => void;

  removeAllQueriesData: (filters?: OmitKeyof<QueryFilters, "queryKey">) => void;

  invalidateQuery: (params?: {
    filters?: OmitKeyof<InvalidateQueryFilters<TQueryKey>, "queryKey">;
    options?: InvalidateOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  invalidateAllQueries: (params?: {
    filters?: OmitKeyof<InvalidateQueryFilters<TQueryKey>, "queryKey">;
    options?: InvalidateOptions;
  }) => Promise<Array<[TQueryKey, TQueryFnData | undefined]>>;

  prefetch: <TData = TQueryFnData>(
    options?: OmitKeyof<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
  ) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  refetchQuery: (params?: {
    filters?: OmitKeyof<RefetchQueryFilters<TQueryKey>, "queryKey">;
    options?: RefetchOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  refetchAllQueries: (params?: {
    filters?: OmitKeyof<RefetchQueryFilters<TQueryKey>, "queryKey">;
    options?: RefetchOptions;
  }) => Promise<Array<[TQueryKey, TQueryFnData | undefined]>>;
};

export type GetFactoryQueryReturnWithParams<
  TQueryFnData = unknown,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, unknown> | undefined = undefined
> = {
  <TData = TQueryFnData>(
    options: OmitKeyof<
      UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    > & {
      params: TParams;
    }
  ): UseQueryResult<NoInfer<TData>, TError>;

  // <TData = TQueryFnData>(
  //   options: OmitKeyof<
  //     DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  //     "queryKey" | "queryFn"
  //   > & {
  //     params: TParams;
  //   }
  // ): DefinedUseQueryResult<NoInfer<TData>, TError>;

  getQueryKey: (params: {
    params: TParams;
  }) => DataTag<TQueryKey, TQueryFnData, TError>;

  getQueryOptions: <TData = TQueryFnData>(
    options?: OmitKeyof<
      | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
      | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    > & { params: TParams }
  ) => (
    | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  ) & {
    queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
  };

  getQueryData: (params: {
    params: TParams;
  }) => InferDataFromTag<TQueryFnData, TQueryKey> | undefined;

  getQueriesData: (
    filters?: OmitKeyof<QueryFilters, "queryKey">
  ) => Array<[TQueryKey, TQueryFnData | undefined]>;

  setQueryData: (params: {
    params: TParams;
    updater: Updater<
      NoInfer<TQueryFnData> | undefined,
      NoInfer<TQueryFnData> | undefined
    >;
    options?: SetDataOptions;
  }) => NoInfer<TQueryFnData> | undefined;

  removeQueryData: (
    filters: OmitKeyof<QueryFilters, "queryKey"> & {
      params: TParams;
    }
  ) => void;

  removeAllQueriesData: (filters?: OmitKeyof<QueryFilters, "queryKey">) => void;

  invalidateQuery: (params: {
    filters?: OmitKeyof<InvalidateQueryFilters<TQueryKey>, "queryKey">;
    params: TParams;
    options?: InvalidateOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  invalidateAllQueries: (params?: {
    filters?: OmitKeyof<InvalidateQueryFilters<TQueryKey>, "queryKey">;
    options?: InvalidateOptions;
  }) => Promise<Array<[TQueryKey, TQueryFnData | undefined]>>;

  prefetch: <TData = TQueryFnData>(
    options: OmitKeyof<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    > & {
      params: TParams;
    }
  ) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  refetchQuery: (params: {
    filters?: OmitKeyof<RefetchQueryFilters<TQueryKey>, "queryKey">;
    params: TParams;
    options?: RefetchOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  refetchAllQueries: (params?: {
    filters?: OmitKeyof<RefetchQueryFilters<TQueryKey>, "queryKey">;
    options?: RefetchOptions;
  }) => Promise<Array<[TQueryKey, TQueryFnData | undefined]>>;
};
