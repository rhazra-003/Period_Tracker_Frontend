import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Box, Typography, Paper, Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const phaseColors = {
  Menstruation: { background: "rgba(244, 63, 94, 0.12)", color: "#BE123C" },
  "Follicular Phase": { background: "rgba(251, 191, 36, 0.16)", color: "#A16207" },
  Ovulation: { background: "rgba(236, 72, 153, 0.14)", color: "#BE185D" },
  "Luteal Phase": { background: "rgba(139, 92, 246, 0.14)", color: "#6D28D9" },
};

export default function FutureCyclePrediction({ refreshKey = 0 }) {
  const [month, setMonth] = useState(dayjs().add(1, "month"));
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setForecast(null);
    setError("");
    api.get(`/cycles/predict/month`, { params: { month: month.format("YYYY-MM") } })
      .then((res) => setForecast(res.data))
      .catch((err) => setError(err.response?.data?.error || "No monthly prediction available"));
  }, [month, refreshKey]);

  const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");
  const selectedMonthLabel = month.format("MMMM YYYY");

  return (
    <Box sx={{ mt: { xs: 3, sm: 5 }, mb: { xs: 3, sm: 5 } }}>
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: "#A21CAF",
          fontWeight: 700,
          mb: 1,
          fontSize: { xs: "1.1rem", sm: "1.3rem" },
          letterSpacing: "-0.02em",
        }}
      >
        Predict Your Future Monthly Cycle
      </Typography>
      <Typography
        align="center"
        sx={{ color: "#6D28D9", mb: { xs: 2, sm: 3 }, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
      >
        Plan ahead by exploring your expected cycle phases.
      </Typography>

      <Paper
        sx={{
          mx: "auto",
          p: { xs: 2, sm: 3 },
          width: { xs: "92%", sm: "80%", md: "62%" },
          maxWidth: 640,
          background: "rgba(255,255,255,0.72)",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 20px 45px rgba(168, 85, 247, 0.12)",
        }}
      >
        <DatePicker
          label="Select month and year"
          value={month}
          onChange={(value) => value && setMonth(value)}
          views={["year", "month"]}
          openTo="month"
          minDate={dayjs().startOf("month")}
          format="MMMM YYYY"
          slotProps={{ textField: { fullWidth: true, size: "small" } }}
        />

        {error ? (
          <Alert severity="info" sx={{ mt: 2, borderRadius: 3 }}>
            {error}
          </Alert>
        ) : forecast ? (
          <Box sx={{ mt: 2.5 }}>
            <Typography sx={{ color: "#A21CAF", fontWeight: 700, mb: 1.5, textAlign: "center" }}>
              Expected phases for {selectedMonthLabel}
            </Typography>
            <Box sx={{ display: "grid", gap: 1 }}>
              {forecast.phases.map((phase) => {
                const colors = phaseColors[phase.name] || phaseColors.Ovulation;
                return (
                  <Box
                    key={`${phase.name}-${phase.start}`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      p: { xs: 1.25, sm: 1.5 },
                      borderRadius: 3,
                      backgroundColor: colors.background,
                      color: colors.color,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.82rem", sm: "0.9rem" } }}>
                      {phase.name}
                    </Typography>
                    <Typography sx={{ textAlign: "right", fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>
                      {formatDate(phase.start)}{phase.start !== phase.end ? ` - ${formatDate(phase.end)}` : ""}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Typography sx={{ mt: 2, color: "#6B7280", textAlign: "center", fontSize: "0.75rem", fontStyle: "italic" }}>
              Subject to normal physical and mental health.
            </Typography>
          </Box>
        ) : null}
      </Paper>
    </Box>
  );
}
