import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Box, Typography, Paper } from "@mui/material";

export default function PredictionBox() {
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/cycles/predict`)
      .then(res => setPrediction(res.data.nextPeriod))
      .catch(err => setError(err.response?.data?.error || "No prediction available"));
  }, []);

  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Next Expected Period</Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Typography variant="h5" color="primary.main" sx={{ mt: 1 }}>{prediction}</Typography>
        )}
      </Paper>
    </Box>
  );
} 