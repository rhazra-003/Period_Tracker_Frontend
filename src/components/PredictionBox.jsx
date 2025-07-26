import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Box, Typography, Paper } from "@mui/material";
import dayjs from "dayjs";

export default function PredictionBox() {
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/cycles/predict`)
      .then(res => {
        // Format the prediction date to DD/MM/YYYY
        const formattedDate = dayjs(res.data.nextPeriod).format('DD/MM/YYYY');
        setPrediction(formattedDate);
      })
      .catch(err => setError(err.response?.data?.error || "No prediction available"));
  }, []);

  return (
    <Box sx={{ 
      mt: { xs: 3, sm: 5 }, 
      mb: { xs: 3, sm: 5 }, 
      display: 'flex', 
      justifyContent: 'center' 
    }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 1.5, sm: 2 }, 
          textAlign: "center",
          backgroundColor: '#FFFFFF',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(255, 105, 180, 0.1)',
          border: '2px solid #FFB6C1',
          width: { xs: '90%', sm: '60%', md: '40%', lg: '25%' },
          minWidth: { xs: '200px', sm: '250px' },
          maxWidth: { xs: '300px', sm: '350px' }
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#C71585',
            fontWeight: 600,
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Next Expected Period
        </Typography>
        {error ? (
          <Typography 
            color="error" 
            sx={{ 
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              p: { xs: 0.3, sm: 0.5 },
              borderRadius: 1,
              fontSize: { xs: '0.7rem', sm: '0.8rem' }
            }}
          >
            {error}
          </Typography>
        ) : (
          <Typography 
            variant="h6" 
            sx={{ 
              mt: { xs: 0.3, sm: 0.5 },
              color: '#FF69B4',
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              textShadow: '1px 1px 2px rgba(255, 105, 180, 0.3)'
            }}
          >
            {prediction}
          </Typography>
        )}
      </Paper>
    </Box>
  );
} 