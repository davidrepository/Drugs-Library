import { Paper, Typography } from "@mui/material";
import { DebugTypoProps, DebugProps } from "./Debug.type";
import { useDebugStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { useViewportWidth } from "../../hooks";

const DebugTypo: React.FC<DebugTypoProps> = ({ children }) => (
  <Typography variant="overline" display="block" gutterBottom>
    {children}
  </Typography>
);

const Debug: React.FC<DebugProps> = ({
  props: {
    isLoading,
    isValidating,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  },
}) => {
  const isViewportWide = useViewportWidth();
  const [showDebug, setDebug] = useDebugStore(
    useShallow((s) => [s.showDebug, s.setDebug])
  );

  useEffect(() => {
    if (!isViewportWide) {
      setDebug(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewportWide]);

  if (!showDebug) return null;

  return (
    <Paper className="debugger" sx={{ marginRight: 3, marginBottom: 3 }}>
      <DebugTypo>{isLoading ? "Loading..." : "Loaded"}</DebugTypo>
      <DebugTypo>{isValidating ? "Validating..." : "Valid"}</DebugTypo>
      <DebugTypo>{isLoadingMore ? "Loading more..." : "Loaded more"}</DebugTypo>
      <DebugTypo>
        {isReachingEnd ? "No more data to load" : "More data available"}
      </DebugTypo>
      <DebugTypo>{isRefreshing ? "Refreshing..." : "Refreshed"}</DebugTypo>
    </Paper>
  );
};

export default Debug;
