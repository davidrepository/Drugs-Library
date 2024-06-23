import { Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const GoUp = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        bottom: 0,
        marginBottom: 3,
        transform: "translateX(-50%)",
        zIndex: 10,
        background: "#fff",
        backgroundColor: "rgba(0,0,0,.1)",
        width: "2.7rem",
        height: "2.7rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "999px",
        cursor: "pointer",
        transition: "background-color .2s",
        backdropFilter: "blur(1rem)",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,.3)",
        },
      }}
      onClick={scrollToTop}
    >
      <ArrowUpwardIcon />
    </Box>
  );
};
