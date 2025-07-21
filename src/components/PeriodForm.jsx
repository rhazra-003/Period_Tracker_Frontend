import React, { useState } from "react";
import api from "../api/axios";
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import dayjs from "dayjs";

export default function PeriodForm() {
  const [date, setDate] = useState(dayjs());
  const [duration, setDuration] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post(`/cycles/track`, null, {
        params: {
          start: date.format("YYYY-MM-DD"),
          duration,
        },
      });
      setSuccess("Cycle tracked!");
    } catch (err) {
      setError(err.response?.data?.error || "Error tracking cycle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" align="center">Track Your Period</Typography>
      <DatePicker
        label="First Day of Last Period"
        value={date}
        onChange={setDate}
        renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} required />}
      />
      <TextField
        label="Period Duration (days)"
        type="number"
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
        fullWidth
        sx={{ mt: 2 }}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => setDuration(d => Math.max(1, d - 1))}><RemoveIcon /></IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setDuration(d => d + 1)}><AddIcon /></IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? "Tracking..." : "Track Now"}
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
    </Box>
  );
} 