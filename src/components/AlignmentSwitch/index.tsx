import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  Alignment,
  HandleChangeAlignmentEvent,
} from "../../pages/Home/Home.type";
import { useSearchStore } from "../../store";
import { useAlignmentStore } from "../../store/useAlignmentStore";
import { useShallow } from "zustand/react/shallow";

export const AlignmentSwitch: React.FC<any> = (): any => {
  const { setSearchValue } = useSearchStore();
  const [alignment, setAlignment] = useAlignmentStore(
    useShallow((s) => [s.alignment, s.setAlignment])
  );

  const handleChangeAlignment: HandleChangeAlignmentEvent = (
    event: React.MouseEvent<unknown>,
    newAlignment: Alignment | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      localStorage.setItem("alignment", newAlignment);
      setSearchValue("");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="overline" display="block">
        View
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChangeAlignment}
        aria-label="Alignment"
      >
        <ToggleButton value="list" sx={{ paddingY: 0.4 }}>
          List
        </ToggleButton>
        <ToggleButton value="table" sx={{ paddingY: 0.4 }}>
          Table
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
