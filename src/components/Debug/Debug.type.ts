export interface DebugTypoProps {
  children: React.ReactNode;
}

export interface DebugProps {
  props: {
    isLoading?: boolean;
    isValidating?: boolean;
    isLoadingMore?: boolean;
    isReachingEnd?: boolean;
    isRefreshing?: boolean;
  };
}
