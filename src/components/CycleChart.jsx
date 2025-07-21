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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CycleChart() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/cycles/recent`, { params: { page: 0, size: 10 } })
      .then(res => {
        const labels = res.data.map(r => r.periodStart).reverse();
        const values = res.data.map(r => r.cycleLength ?? null).reverse();
        setData({
          labels,
          datasets: [
            {
              label: "Cycle Length (days)",
              data: values,
              borderColor: "#1976d2",
              backgroundColor: "rgba(25, 118, 210, 0.2)",
              tension: 0.3,
            },
          ],
        });
      })
      .catch(err => setError("Error loading chart"));
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" align="center">Cycle Chart</Typography>
      <Line data={data} options={{
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { title: { display: true, text: "Days" }, beginAtZero: true },
          x: { title: { display: true, text: "Entry Date" } },
        },
      }} />
    </Box>
  );
} 