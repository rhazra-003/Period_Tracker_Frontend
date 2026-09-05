import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Box, Typography, Paper } from "@mui/material";
import dayjs from "dayjs";

export default function PredictionBox({ refreshKey = 0 }) {
  const [prediction, setPrediction] = useState({
    nextPeriod: "",
    ovulationDate: "",
    fertileWindowStart: "",
    fertileWindowEnd: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    api.get(`/cycles/predict`)
      .then(res => {
        setPrediction({
          nextPeriod: res.data.nextPeriod ? dayjs(res.data.nextPeriod).format('DD/MM/YYYY') : "",
          ovulationDate: res.data.ovulationDate ? dayjs(res.data.ovulationDate).format('DD/MM/YYYY') : "",
          fertileWindowStart: res.data.fertileWindowStart ? dayjs(res.data.fertileWindowStart).format('DD/MM/YYYY') : "",
          fertileWindowEnd: res.data.fertileWindowEnd ? dayjs(res.data.fertileWindowEnd).format('DD/MM/YYYY') : "",
        });
      })
      .catch(err => setError(err.response?.data?.error || "No prediction available"));
  }, [refreshKey]);

  const predictionItems = [
    { label: "Next Expected Period", value: prediction.nextPeriod },
    { label: "Estimated Ovulation Date", value: prediction.ovulationDate },
    { label: "Fertile Window", value: `${prediction.fertileWindowStart} - ${prediction.fertileWindowEnd}` },
  ];

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
          width: { xs: '92%', sm: '72%', md: '52%', lg: '36%' },
          minWidth: { xs: '220px', sm: '280px' },
          maxWidth: { xs: '360px', sm: '440px' }
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#C71585',
            fontWeight: 600,
            mb: { xs: 0.75, sm: 1.25 },
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Cycle Prediction
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
            {predictionItems.map((item) => (
              <Box key={item.label} sx={{ width: '100%', textAlign: 'center', borderBottom: '1px solid rgba(255, 105, 180, 0.2)', pb: 1 }}>
                <Typography sx={{ color: '#C71585', fontWeight: 600, fontSize: '0.78rem', mb: 0.25 }}>
                  {item.label}
                </Typography>
                <Typography sx={{ color: '#FF69B4', fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1.05rem' } }}>
                  {item.value || "—"}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
} 