import React, { useState } from "react";
import api from "../api/axios";
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Grid } from "@mui/material";
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 1, sm: 2 } }}>
      {/* Date and Duration Row */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center', 
        alignItems: 'center',
        gap: { xs: 2, sm: 4, md: 6 }, 
        mb: { xs: 3, sm: 4 },
      }}>
        <Box sx={{ 
          width: { xs: '100%', sm: '80%', md: '300px' },
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' }
        }}>
          <DatePicker
            label="First Day of Last Period"
            value={date}
            onChange={setDate}
            format="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField 
                {...params} 
                fullWidth 
                required 
                size="small"
                sx={{
                  '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ 
          width: { xs: '100%', sm: '60%', md: '200px' },
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}>
          <TextField
            label="Period Duration (Days)"
            type="number"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            fullWidth
            required
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton 
                    onClick={() => setDuration(d => Math.max(1, d - 1))}
                    sx={{ 
                      color: '#C71585',
                      padding: { xs: '4px', sm: '8px' }
                    }}
                    size="small"
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setDuration(d => d + 1)}
                    sx={{ 
                      color: '#C71585',
                      padding: { xs: '4px', sm: '8px' }
                    }}
                    size="small"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              style: { 
                textAlign: 'center',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center',
              }
            }}
          />
        </Box>
      </Box>

      {/* Track Button Row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 1, sm: 2 } }}>
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{ 
            px: { xs: 6, sm: 8 },
            py: { xs: 1, sm: 1.5 },
            backgroundColor: '#FF69B4',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '&:hover': {
              backgroundColor: '#C71585',
            }
          }}
          disabled={loading}
        >
          {loading ? "Tracking..." : "Track Now"}
        </Button>
      </Box>

      {error && (
        <Typography 
          color="error" 
          sx={{ 
            mt: { xs: 1, sm: 2 }, 
            textAlign: 'center',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            p: { xs: 0.5, sm: 1 },
            borderRadius: 1,
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {error}
        </Typography>
      )}
      {success && (
        <Typography 
          color="success.main" 
          sx={{ 
            mt: { xs: 1, sm: 2 }, 
            textAlign: 'center',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            p: { xs: 0.5, sm: 1 },
            borderRadius: 1,
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {success}
        </Typography>
      )}
    </Box>
  );
} 