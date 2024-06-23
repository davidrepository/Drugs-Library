import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, DrugDetails } from "./pages";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ backgroundColor: "#fafafa" }} className="App">
      <BrowserRouter>
        <Box component="main">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/drug/:id" element={<DrugDetails />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
