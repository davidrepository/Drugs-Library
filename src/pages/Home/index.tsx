import { ReactNode, useRef } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { Alignment } from "./Home.type";
import { DrugsList, DrugsTable } from "../../components";
import { useErrorStore, useSearchStore, useAlignmentStore } from "../../store";
import { AlignmentSwitch, DebugToggle, GoUp } from "../../components";
import { useIntersectionObserver, useViewportWidth } from "../../hooks";

export const Home = () => {
  const drugDetailsRef = useRef<HTMLDivElement>(null);
  const { searchValue, setSearchValue } = useSearchStore();
  const alignment = useAlignmentStore((state: any) => state.alignment);
  const error = useErrorStore();
  const isComponentVisible = useIntersectionObserver(drugDetailsRef);
  const isViewportWide = useViewportWidth();

  const switchComponent = (alignment: Alignment): ReactNode => {
    const comps = {
      list: <DrugsList />,
      table: <DrugsTable />,
    };

    return comps[alignment] || null;
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        py: 9,
        gap: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          type="text"
          variant="outlined"
          sx={{ flexGrow: 1 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What drag you looking for?"
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        ref={drugDetailsRef}
      >
        <AlignmentSwitch />
        {isViewportWide && <DebugToggle />}
      </Box>

      {error.errorMessage && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <p>{error.errorMessage}</p>
          {error.errorCode === "NOT_FOUND" && (
            <Button variant="contained" onClick={() => setSearchValue("")}>
              Clean search
            </Button>
          )}
        </Box>
      )}

      {switchComponent(alignment)}

      {!isComponentVisible && <GoUp />}
    </Container>
  );
};
