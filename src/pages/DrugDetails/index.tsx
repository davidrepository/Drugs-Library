import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { API_ENDPOINT } from "../../constants";
import { useErrorStore } from "../../store";
import { useDataFetch } from "../../hooks";
import { fetcher } from "../../utils";

export const DrugDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: drug,
    isValidating,
    isLoading,
  }: any = useDataFetch({
    apiEndpoint: API_ENDPOINT,
    fetcher,
    queryKey: id ? `product_id:"${id.trim()}"` : null,
  });
  const { errorMessage } = useErrorStore();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        py: 3,
        gap: 3,
      }}
    >
      <Button onClick={handleGoBack} sx={{ gap: 2 }}>
        <ArrowBackIcon />
        <Typography>Go back</Typography>
      </Button>
      {(isLoading || errorMessage) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexDirection: "column",
            width: "100%",
          }}
        >
          {isLoading && <CircularProgress />}
          {errorMessage && <Typography>{errorMessage}</Typography>}
        </Box>
      )}
      {!errorMessage && !isLoading && !isValidating && (
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Drug Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Brand Name:</Typography>
              <Typography variant="body1">{drug?.brand_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Generic Name:</Typography>
              <Typography variant="body1">{drug?.generic_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Labeler Name:</Typography>
              <Typography variant="body1">{drug?.labeler_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Active Ingredients:</Typography>
              {drug?.active_ingredients.map(
                (ingredient: any, index: number) => (
                  <Typography key={index} variant="body1">
                    {ingredient.name} ({ingredient.strength})
                  </Typography>
                )
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Dosage Form:</Typography>
              <Typography variant="body1">{drug?.dosage_form}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Route:</Typography>
              <Typography variant="body1">{drug?.route.join(", ")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Marketing Category:</Typography>
              <Typography variant="body1">
                {drug?.marketing_category}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Manufacturer Name:</Typography>
              <Typography variant="body1">
                {drug?.openfda?.manufacturer_name.join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Product Type:</Typography>
              <Typography variant="body1">{drug?.product_type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Package Description:</Typography>
              {drug?.packaging.map((packageInfo: any, index: number) => (
                <Typography key={index} variant="body1">
                  {packageInfo.description}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};
