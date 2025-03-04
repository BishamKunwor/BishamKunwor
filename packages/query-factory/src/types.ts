import type {
  DefinedInitialDataOptions,
  DefaultError,
  QueryKey,
  UseQueryOptions,
  UndefinedInitialDataOptions,
  SkipToken,
  QueryClient,
} from "@tanstack/react-query";

type QueryFn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> =
  | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>["queryFn"]
  | UndefinedInitialDataOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey
    >["queryFn"]
  | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>["queryFn"];

export type QueryOptionsObj<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, any> | undefined = undefined
> = (
  | Omit<
      DefinedInitialDataOptions<
        NoInfer<TQueryFnData>,
        TError,
        TData,
        NoInfer<TQueryKey>
      >,
      "queryKey" | "queryFn"
    >
  | Omit<
      UndefinedInitialDataOptions<
        NoInfer<TQueryFnData>,
        TError,
        TData,
        NoInfer<TQueryKey>
      >,
      "queryKey" | "queryFn"
    >
  | Omit<
      UseQueryOptions<NoInfer<TQueryFnData>, TError, TData, NoInfer<TQueryKey>>,
      "queryKey" | "queryFn"
    >
) & {
  queryKey: ((params: TParams) => TQueryKey) | (() => TQueryKey);
  queryFn: (
    params: Parameters<
      Exclude<
        QueryFn<NoInfer<TQueryFnData>, TError, TData, NoInfer<TQueryKey>>,
        undefined | SkipToken
      >
    >[0] &
      (TParams extends undefined ? {} : { params: TParams })
  ) => TQueryFnData | Promise<TQueryFnData>;
};

export type QueryInstanceProps<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TParams extends Record<string, any> | undefined = undefined
> = TParams extends undefined
  ? [
      queryInstanceOptions?: Omit<
        QueryOptionsObj<TQueryFnData, TError, TData, TQueryKey>,
        "queryKey" | "queryFn"
      >,
      queryClient?: QueryClient
    ]
  : [
      queryInstanceOptions: Omit<
        QueryOptionsObj<TQueryFnData, TError, TData, TQueryKey>,
        "queryKey" | "queryFn"
      > & {
        params: TParams;
      },
      queryClient?: QueryClient
    ];
