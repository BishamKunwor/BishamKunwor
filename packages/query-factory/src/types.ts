import type {
  DataTag,
  DefaultError,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
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
  UnusedSkipTokenOptions,
  Updater,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export type QueryFunctionContextObj<TQueryKey extends QueryKey = QueryKey> =
  QueryFunctionContext<TQueryKey>;

export type GetFactoryQueryOptionsWithoutParams<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TQueryOptions extends
    | UndefinedInitialDataOptions
    | UnusedSkipTokenOptions
    | DefinedInitialDataOptions = UseQueryOptions
> = OmitKeyof<
  TQueryOptions extends UndefinedInitialDataOptions
    ? UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    : TQueryOptions extends UnusedSkipTokenOptions
    ? UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
    : TQueryOptions extends DefinedInitialDataOptions
    ? DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    : UseQueryOptions,
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
  TQueryOptions extends
    | UndefinedInitialDataOptions
    | UnusedSkipTokenOptions
    | DefinedInitialDataOptions = UseQueryOptions,
  TParams extends Record<string, unknown> | undefined = undefined
> = OmitKeyof<
  TQueryOptions extends UndefinedInitialDataOptions
    ? UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    : TQueryOptions extends UnusedSkipTokenOptions
    ? UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
    : TQueryOptions extends DefinedInitialDataOptions
    ? DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    : UseQueryOptions,
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
      | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
      | UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
  ): UseQueryResult<NoInfer<TData>, TError>;

  <TData = TQueryFnData>(
    options: OmitKeyof<DefinedInitialDataOptions, "queryKey" | "queryFn">
  ): DefinedUseQueryResult<NoInfer<TData>, TError>;

  getQueryKey: () => DataTag<TQueryKey, TQueryFnData, TError>;

  getQueryOptions: <TData = TQueryFnData>(
    options?: OmitKeyof<
      | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
      | UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
      | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
  ) => (
    | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    | UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
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

  removeQueryData: (
    filters?: OmitKeyof<QueryFilters, "queryKey" | "exact">
  ) => void;

  removeAllQueriesData: (filters?: OmitKeyof<QueryFilters, "queryKey">) => void;

  invalidateQuery: (params?: {
    filters?: OmitKeyof<
      InvalidateQueryFilters<TQueryKey>,
      "queryKey" | "exact"
    >;
    options?: InvalidateOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  invalidateAllQueries: (params?: {
    filters?: OmitKeyof<
      InvalidateQueryFilters<TQueryKey>,
      "queryKey" | "exact"
    >;
    options?: InvalidateOptions;
  }) => Promise<Array<[TQueryKey, TQueryFnData | undefined]>>;

  prefetch: <TData = TQueryFnData>(
    options?: OmitKeyof<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
  ) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  refetchQuery: (params?: {
    filters?: RefetchQueryFilters<TQueryKey>;
    options?: RefetchOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  refetchAllQueries: (params?: {
    filters?: RefetchQueryFilters<TQueryKey>;
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
      | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
      | UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    > & {
      params: TParams;
    }
  ): UseQueryResult<NoInfer<TData>, TError>;

  <TData = TQueryFnData>(
    options: OmitKeyof<
      DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    > & {
      params: TParams;
    }
  ): DefinedUseQueryResult<NoInfer<TData>, TError>;

  getQueryKey: (params: {
    params: TParams;
  }) => DataTag<TQueryKey, TQueryFnData, TError>;

  getQueryOptions: <TData = TQueryFnData>(
    options?: OmitKeyof<
      | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
      | UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
      | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    > & { params: TParams }
  ) => (
    | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
    | UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
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
    filters: OmitKeyof<QueryFilters, "queryKey" | "exact"> & {
      params: TParams;
    }
  ) => void;

  removeAllQueriesData: (filters?: OmitKeyof<QueryFilters, "queryKey">) => void;

  invalidateQuery: (params: {
    filters?: OmitKeyof<
      InvalidateQueryFilters<TQueryKey>,
      "queryKey" | "exact"
    >;
    params: TParams;
    options?: InvalidateOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  invalidateAllQueries: (params?: {
    filters?: OmitKeyof<
      InvalidateQueryFilters<TQueryKey>,
      "queryKey" | "exact"
    >;
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
    filters?: RefetchQueryFilters<TQueryKey>;
    params: TParams;
    options?: RefetchOptions;
  }) => Promise<InferDataFromTag<TQueryFnData, TQueryKey> | undefined>;

  refetchAllQueries: (params?: {
    filters?: RefetchQueryFilters<TQueryKey>;
    options?: RefetchOptions;
  }) => Promise<Array<[TQueryKey, TQueryFnData | undefined]>>;
};
