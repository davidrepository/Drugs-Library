import useSWRInfinite from "swr/infinite";
import { useEffect, useMemo } from "react";
import {
  UseDataFetchParams,
  UseDataFetchReturn,
  GetKeyParams,
} from "./useDataFetch.type";
import { useErrorStore } from "../store";

const getKey = ({
  index,
  apiEndpoint,
  initialLimit,
  queryKey,
  additionalQueryParams,
}: GetKeyParams): string => {
  const queryParams = new URLSearchParams(
    initialLimit
      ? {
          limit: initialLimit,
          skip: initialLimit ? index * initialLimit : index,
          ...additionalQueryParams,
        }
      : {}
  );

  if (queryKey) {
    queryParams.set("search", `${queryKey}`);
  }

  return `${apiEndpoint}?${queryParams.toString()}`;
};

export const useDataFetch = ({
  apiEndpoint,
  queryKey,
  initialLimit,
  fetcher,
  options = {},
  additionalQueryParams = {},
  extractTotalResults,
  extractItems,
  isPaginated = false,
}: UseDataFetchParams): UseDataFetchReturn => {
  const { setError } = useErrorStore();
  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(
      (index: number) =>
        getKey({
          index,
          apiEndpoint,
          initialLimit,
          queryKey,
          additionalQueryParams,
        }),
      fetcher,
      {
        keepPreviousData: true,
        revalidateFirstPage: false,
        refreshInterval: 0,
        refreshWhenOffline: false,
        shouldRetryOnError: false,
        ...options,
      }
    );

  const totalResults = useMemo(() => {
    if (typeof extractTotalResults === "function") {
      return extractTotalResults(data);
    }
    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const items = useMemo(() => {
    if (typeof extractItems === "function") {
      if (isPaginated) {
        return data ? extractItems(data, size - 1) : [];
      } else {
        return data ? extractItems(data) : [];
      }
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, size, isPaginated]);

  const isLoadingMore = useMemo(
    () =>
      isLoading || (size > 0 && data && typeof data[size - 1] === "undefined"),
    [isLoading, size, data]
  );

  const isEmpty = useMemo(() => items?.length === 0, [items]);

  const isReachingEnd = useMemo(() => {
    return isEmpty || items?.length >= totalResults;
  }, [isEmpty, items?.length, totalResults]);

  const isRefreshing = useMemo(() => {
    return isValidating && data && data.length === size;
  }, [isValidating, data, size]);

  useEffect(() => {
    if (error) {
      setError(error.code, error.message);
    } else {
      setError(null, null);
    }
  }, [error]);

  return {
    data: initialLimit ? items : data?.[0].results[0],
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
    totalResults,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    error,
  };
};
