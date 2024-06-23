export interface TableCellProps {
  children: React.ReactNode;
  align: "left" | "center" | "right";
}

export interface ListRowsLoaderProps {
  rowsNum: number;
}

export interface DrugData {
  product_id: string;
  product_ndc: string;
  generic_name: string;
  brand_name: string;
  labeler_name: string;
  dosage_form: string;
  marketing_category: string;
}

export type FetcherType = (url: string) => Promise<DrugData[]>;

export type ExtractTotalResultsType = (data: any) => number;

export type ExtractItemsType = (
  data: DrugData[],
  page?: number
) => DrugData[] | undefined;
