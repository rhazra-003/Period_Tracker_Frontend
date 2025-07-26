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

export default function CycleChart() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/cycles/recent`, { params: { page: 0, size: 10 } })
      .then(res => {
        // Format dates to DD/MM/YYYY and reverse for chronological order
        const labels = res.data.map(r => dayjs(r.periodStart).format('DD/MM/YYYY')).reverse();
        const values = res.data.map(r => r.cycleLength ?? null).reverse();
        
        // Filter out null values and their corresponding labels
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
  }, []);

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
      <Typography 
        variant="h6" 
        align="center" 
        sx={{ 
          color: '#C71585',
          fontWeight: 600,
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}
      >
        Cycle Chart
      </Typography>
      <Box 
        sx={{ 
          backgroundColor: '#FFFFFF',
          borderRadius: 3,
          p: { xs: 1, sm: 2 },
          boxShadow: '0 4px 20px rgba(255, 105, 180, 0.1)',
          height: { xs: '250px', sm: '300px', md: '350px' },
          overflow: 'hidden'
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
                min: 20,
                grid: {
                  color: 'rgba(255, 105, 180, 0.1)',
                },
                ticks: {
                  color: '#C71585',
                  font: {
                    size: window.innerWidth < 600 ? 10 : 12
                  }
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
                  maxRotation: 45,
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