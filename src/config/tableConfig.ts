import { Drug } from "./tableConfig.type";

export const columns: any = [
  {
    field: "product_ndc",
    headerName: "Product NDC",
    width: 150,
    align: "left",
  },
  { field: "brand_name", headerName: "Brand Name", width: 200, align: "right" },
  {
    field: "generic_name",
    headerName: "Generic Name",
    width: 330,
    align: "right",
  },
  {
    field: "labeler_name",
    headerName: "Labeler Name",
    width: 250,
    align: "right",
  },
  {
    field: "dosage_form",
    headerName: "Dosage Form",
    width: 300,
    align: "right",
  },
];

export const rows = (drugs: Drug[]) =>
  drugs?.map((drug) => ({
    product_id: drug?.product_id,
    product_ndc: drug?.product_ndc,
    generic_name: drug?.generic_name,
    brand_name: drug?.brand_name,
    labeler_name: drug?.labeler_name,
    dosage_form: drug?.dosage_form,
  }));
