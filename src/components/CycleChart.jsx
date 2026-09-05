import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CycleChart({ refreshKey = 0 }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setData(null);
    setError("");
    setIsLocked(false);
    api.get(`/cycles/recent`, { params: { page: 0, size: 10 } })
      .then(res => {
        if (res.data.length < 3) {
          setIsLocked(true);
          return;
        }

        const labels = res.data.map(r => dayjs(r.periodStart).format('DD/MM')).reverse();
        const values = res.data.map(r => r.cycleLength ?? null).reverse();

        const filteredData = labels.map((label, index) => ({
          label,
          value: values[index]
        })).filter(item => item.value !== null);

        const chartLabels = filteredData.map(item => item.label);
        const chartValues = filteredData.map(item => item.value);

        setData({
          labels: chartLabels,
          datasets: [
            {
              label: "Cycle Length (days)",
              data: chartValues,
              borderColor: "#FF69B4",
              backgroundColor: "rgba(255, 105, 180, 0.2)",
              tension: 0.3,
              pointBackgroundColor: "#C71585",
              pointBorderColor: "#C71585",
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        });
      })
      .catch(err => setError("Error loading chart"));
  }, [refreshKey]);

  const chartHeading = (
    <Typography 
      variant="h6" 
      align="center" 
      sx={{ 
        color: '#A21CAF',
        fontWeight: 700,
        mb: { xs: 2, sm: 3 },
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
        letterSpacing: '-0.02em',
      }}
    >
      Cycle Chart
    </Typography>
  );

  if (isLocked) return (
    <Box sx={{ mt: { xs: 3, sm: 5 } }}>
      {chartHeading}
      <Typography
        sx={{
          textAlign: 'center',
          color: '#A21CAF',
          backgroundColor: 'rgba(255,255,255,0.62)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          p: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          fontSize: { xs: '0.8rem', sm: '0.875rem' },
          fontWeight: 600,
        }}
      >
        Record at least the last 3 period dates to unlock the cycle chart.
      </Typography>
    </Box>
  );

  if (error) return (
    <Typography 
      color="error" 
      sx={{ 
        textAlign: 'center',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        p: { xs: 0.5, sm: 1 },
        borderRadius: 1,
        fontSize: { xs: '0.8rem', sm: '0.875rem' }
      }}
    >
      {error}
    </Typography>
  );
  if (!data) return null;

  return (
    <Box sx={{ mt: { xs: 3, sm: 5 } }}>
      {chartHeading}
      <Box 
        sx={{ 
          background: 'rgba(255,255,255,0.72)',
          borderRadius: 4,
          p: { xs: 1, sm: 2 },
          boxShadow: '0 20px 45px rgba(168, 85, 247, 0.12)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          height: { xs: '250px', sm: '300px', md: '350px' },
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 24px 60px rgba(168, 85, 247, 0.16)',
            transform: 'translateY(-2px)'
          }
        }}
      >
        <Line 
          data={data} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(255, 105, 180, 0.9)',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                borderColor: '#C71585',
                borderWidth: 1,
                cornerRadius: 8,
                titleFont: {
                  size: window.innerWidth < 600 ? 12 : 14
                },
                bodyFont: {
                  size: window.innerWidth < 600 ? 11 : 13
                }
              },
            },
            scales: {
              y: { 
                title: { 
                  display: true, 
                  text: "Days",
                  color: '#C71585',
                  font: {
                    weight: 'bold',
                    size: window.innerWidth < 600 ? 12 : 14
                  }
                }, 
                beginAtZero: false,
                min: 24,
                max: 32,
                ticks: {
                  stepSize: 2,
                  color: '#C71585',
                  font: {
                    size: window.innerWidth < 600 ? 10 : 12
                  }
                },
                grid: {
                  color: 'rgba(255, 105, 180, 0.1)',
                }
              },
              x: { 
                title: { 
                  display: true, 
                  text: "Period Date",
                  color: '#C71585',
                  font: {
                    weight: 'bold',
                    size: window.innerWidth < 600 ? 12 : 14
                  }
                },
                grid: {
                  color: 'rgba(255, 105, 180, 0.1)',
                },
                ticks: {
                  color: '#C71585',
                  maxRotation: 0,
                  autoSkip: false,
                  maxTicksLimit: 10,
                  font: {
                    size: window.innerWidth < 600 ? 9 : 11
                  }
                }
              },
            },
            elements: {
              point: {
                hoverBackgroundColor: '#C71585',
                radius: window.innerWidth < 600 ? 4 : 6,
                hoverRadius: window.innerWidth < 600 ? 6 : 8,
              }
            }
          }} 
        />
      </Box>
    </Box>
  );
} 