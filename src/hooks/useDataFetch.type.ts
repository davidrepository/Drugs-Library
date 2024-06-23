type FetcherFunction = (url: string) => Promise<any>;

export type GetKeyParams = {
  index: number;
  apiEndpoint: string;
  initialLimit?: number | undefined;
  queryKey?: string | null;
  additionalQueryParams?: any;
  singleId?: string;
};

export interface UseDataFetchParams {
  apiEndpoint: string;
  fetcher: FetcherFunction;
  queryKey?: string | null;
  initialLimit?: number;
  options?: any;
  additionalQueryParams?: Record<string, any>;
  extractTotalResults?: (data: any) => number;
  extractItems?: (data: any, index?: number) => any[];
  isPaginated?: boolean;
  singleId?: string;
}

export interface UseDataFetchReturn {
  data: any[];
  mutate: any;
  size: number;
  setSize: (size: number | ((size: number) => number)) => void;
  totalResults: number;
  isValidating?: boolean;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  isEmpty?: boolean;
  isReachingEnd?: boolean;
  isRefreshing?: boolean;
  error?: any;
}
