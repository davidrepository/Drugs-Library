import { TableCell } from "@mui/material";
import { TableCellProps } from "../DrugsList/DrugsList.type";

export const TableRowCell: React.FC<TableCellProps> = ({
  children,
  ...rest
}) => {
  return (
    <TableCell {...rest}>
      <span
        style={{
          display: "inline-block",
          width: "240px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {children}
      </span>
    </TableCell>
  );
};
