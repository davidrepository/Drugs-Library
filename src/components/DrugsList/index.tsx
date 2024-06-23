import { useEffect, useRef, useState } from "react";
import { useDataFetch, useDebounce } from "../../hooks";
import { useSearchStore } from "../../store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Skeleton,
} from "@mui/material";
import { columns, rows } from "../../config/tableConfig";
import { API_ENDPOINT, LIMITS, QUERY_KEY } from "../../constants";
import { ListRowsLoaderProps } from "./DrugsList.type";

import { fetcher } from "../../utils";
import Debug from "../Debug";
import { useNavigate } from "react-router-dom";
import { TableRowCell } from "../";

const extractTotalResults: any = (data: any) =>
  data?.[0]?.meta?.results?.total ?? 0;

const extractItems: any = (data: any) =>
  data ? data.flatMap((page: any) => page.results) : [];

export const DrugsList = () => {
  const navigate = useNavigate();
  const { searchValue } = useSearchStore();
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [rowsPerPage] = useState(LIMITS.LIST);
  const {
    data: drugs,
    setSize,
    isValidating,
    isLoading,
    isLoadingMore,
    isRefreshing,
    isReachingEnd,
    error,
  } = useDataFetch({
    apiEndpoint: API_ENDPOINT,
    queryKey: debouncedSearchValue
      ? `${QUERY_KEY.BRAND_NAME}:*${debouncedSearchValue.trim()}*`
      : null,
    initialLimit: rowsPerPage,
    fetcher,
    extractTotalResults,
    extractItems,
    options: {
      refreshInterval: 0,
      refreshWhenOffline: false,
      shouldRetryOnError: false,
    },
  });
  const [loadMoreInteracted, setLoadMoreInteracted] = useState(false);
  const buttonRef = useRef(null);

  const drugsRows = rows(drugs);

  useEffect(() => {
    setSize(1);
    setLoadMoreInteracted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadMoreInteracted || isLoadingMore || isReachingEnd) return;
    const currentButtonRef = buttonRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSize((s) => s + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (currentButtonRef) {
      observer.observe(currentButtonRef);
    }

    return () => {
      if (currentButtonRef) {
        observer.unobserve(currentButtonRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreInteracted, isLoadingMore]);

  const handleLoadMore = () => {
    setSize((s) => s + 1);
    setLoadMoreInteracted(true);
  };

  const handleRowClick: any = (row: any) => {
    navigate(`/drug/${row.product_id}`);
  };

  const TableRowsLoader: React.FC<ListRowsLoaderProps> = ({ rowsNum }): any => {
    return [...Array(rowsNum)].map((row, indexRow) => (
      <TableRow key={indexRow}>
        {[...Array(columns.length)].map((col, indexCol) => (
          <TableCell key={indexCol} component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {!error && !isLoading && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns?.map((column: any) => (
                    <TableCell
                      key={column?.field}
                      align={column?.align}
                      sx={{
                        minWidth: column?.width,
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {column?.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {!drugsRows?.length ? (
                <TableBody>
                  <TableRowsLoader rowsNum={rowsPerPage} />
                </TableBody>
              ) : (
                <TableBody>
                  {drugsRows?.map((row, index) => {
                    return (
                      <TableRow
                        key={row.product_ndc}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRowClick(row)}
                      >
                        {Object.keys(row).map(
                          (key: string, index: number): any => {
                            if (key === "product_id") return null;
                            return (
                              <TableRowCell
                                key={index}
                                align={key === "product_ndc" ? "left" : "right"}
                              >
                                {row[key as keyof typeof row]}
                              </TableRowCell>
                            );
                          }
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
      )}
      {!isReachingEnd && !isLoading && !error && (
        <Button
          sx={
            loadMoreInteracted
              ? {
                  position: "absolute",
                  bottom: 0,
                  opacity: 0,
                  pointerEvents: "none",
                }
              : null
          }
          variant="outlined"
          onClick={handleLoadMore}
          ref={buttonRef}
        >
          Load more
        </Button>
      )}
      {(isLoading || isValidating) && !error && (
        <CircularProgress sx={{ justifySelf: "center", alignSelf: "center" }} />
      )}

      <Debug
        props={{
          isLoading,
          isValidating,
          isLoadingMore,
          isReachingEnd,
          isRefreshing,
        }}
      />
    </Box>
  );
};
