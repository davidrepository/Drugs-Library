import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Skeleton,
  TableHead,
  Box,
} from "@mui/material";
import { TableRowsLoaderProps } from "./DrugsTable.type";

import Debug from "../Debug";

import { useDebounce, useDataFetch } from "../../hooks";
import { API_ENDPOINT, LIMITS, QUERY_KEY } from "../../constants";
import { columns, rows } from "../../config/tableConfig";
import { useSearchStore } from "../../store";
import { fetcher } from "../../utils";
import { TableRowCell } from "../";

type DataItemType = {
  results?: any[];
  meta?: {
    results?: {
      total?: number;
    };
  };
};

type ExtractTotalResultsFn = (data: DataItemType[]) => number;
type ExtractItemsFn = (data: DataItemType[], page?: number) => any[];

const extractTotalResults: ExtractTotalResultsFn = (data: any) =>
  data?.[0]?.meta?.results?.total ?? 0;

const extractItems: ExtractItemsFn = (data: any, page: any) => {
  return data && typeof page !== "undefined" && data[page]?.results;
};

export const DrugsTable = () => {
  const navigate = useNavigate();
  const { searchValue } = useSearchStore();
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const prevSearchValueRef = useRef(searchValue);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(LIMITS.TABLE);
  const {
    data: drugs,
    setSize,
    isValidating,
    isLoading,
    totalResults,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  } = useDataFetch({
    apiEndpoint: API_ENDPOINT,
    queryKey: debouncedSearchValue
      ? `${QUERY_KEY.BRAND_NAME}:*${debouncedSearchValue.trim()}*`
      : null,
    initialLimit: rowsPerPage,
    fetcher,
    extractTotalResults,
    extractItems,
    isPaginated: true,
  });
  const drugsRows = rows(drugs);

  useEffect(() => {
    setSize(1);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (debouncedSearchValue !== prevSearchValueRef.current) {
      setPage(0);
      prevSearchValueRef.current = debouncedSearchValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    setSize(newPage + 1);
    window.scrollTo(0, 0);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setSize(1);
    window.scrollTo(0, 0);
  };

  const handleRowClick: any = (row: any) => {
    navigate(`/drug/${row.product_id}`);
  };

  const TableRowsLoader: React.FC<TableRowsLoaderProps> = ({
    rowsNum,
  }): any => {
    return [...Array(rowsNum)].map((row, indexRow) => (
      <TableRow key={indexRow}>
        {[...Array(columns?.length)].map((col, indexCol) => (
          <TableCell key={indexCol} component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead sx={{ position: "sticky", top: "0px" }}>
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
            {!drugsRows?.length || isLoading || isValidating ? (
              <TableBody>
                <TableRowsLoader rowsNum={rowsPerPage} />
              </TableBody>
            ) : (
              <TableBody>
                {drugsRows?.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={row.product_id}
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
                      <TableRowCell align="left">
                        {row.product_ndc}
                      </TableRowCell>
                      <TableRowCell align="right">
                        {row.generic_name}
                      </TableRowCell>
                      <TableRowCell align="right">
                        {row.brand_name}
                      </TableRowCell>
                      <TableRowCell align="right">
                        {row.labeler_name}
                      </TableRowCell>
                      <TableRowCell align="right">
                        {row.dosage_form}
                      </TableRowCell>
                    </TableRow>
                  );
                })}
                {rows?.length === 0 && !isLoading && !isValidating && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          className="table-pagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalResults}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

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
