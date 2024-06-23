import { Box, Checkbox, Typography } from "@mui/material";
import { useDebugStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import { DebugStore, DebugToggleProps } from "./DebugToggle.type";

export const DebugToggle: React.FC<DebugToggleProps> = () => {
  const [showDebug, toggleDebug] = useDebugStore(
    useShallow((s: DebugStore) => [s.showDebug, s.toggleDebug])
  );

  return (
    <Box
      component="label"
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
      htmlFor="debug"
    >
      <Typography variant="overline" display="block">
        Debug
      </Typography>
      <Checkbox
        id="debug"
        checked={showDebug}
        onChange={toggleDebug}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
};
