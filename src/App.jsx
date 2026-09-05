import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import LoginButton from "./components/LoginButton";
import PeriodForm from "./components/PeriodForm";
import HistoryList from "./components/HistoryList";
import CycleChart from "./components/CycleChart";
import PredictionBox from "./components/PredictionBox";
import FutureCyclePrediction from "./components/FutureCyclePrediction";
import api from "./api/axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: '#F43F5E', light: '#FDA4AF', dark: '#BE123C' },
    secondary: { main: '#7C3AED', light: '#C4B5FD', dark: '#5B21B6' },
    background: { default: mode === 'dark' ? '#171326' : '#FFF1F2', paper: mode === 'dark' ? 'rgba(31, 25, 52, 0.82)' : 'rgba(255, 255, 255, 0.8)' },
    text: { primary: mode === 'dark' ? '#F8F7FF' : '#312E81', secondary: mode === 'dark' ? '#C4B5FD' : '#6B7280' },
  },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", sans-serif',
    h4: { color: mode === 'dark' ? '#F8F7FF' : '#312E81', fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h5: { color: mode === 'dark' ? '#F8F7FF' : '#312E81', fontWeight: 700, letterSpacing: '-0.03em' },
    h6: { color: mode === 'dark' ? '#F8F7FF' : '#312E81', fontWeight: 600, letterSpacing: '-0.02em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: mode === 'dark' ? 'linear-gradient(135deg, #171326 0%, #211632 48%, #161827 100%)' : 'linear-gradient(135deg, #fff7fb 0%, #fff1f2 28%, #f5f3ff 65%, #fff7ed 100%)',
          color: mode === 'dark' ? '#F8F7FF' : '#312E81',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: '0 12px 24px rgba(244, 63, 94, 0.22)',
          background: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 52%, #F97316 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #E11D48 0%, #F43F5E 55%, #EA580C 100%)',
            boxShadow: '0 16px 28px rgba(244, 63, 94, 0.28)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: mode === 'dark' ? 'rgba(31,25,52,0.82)' : 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: mode === 'dark' ? '0 18px 45px rgba(0,0,0,0.28)' : '0 18px 45px rgba(190, 24, 93, 0.13)',
          border: mode === 'dark' ? '1px solid rgba(196,181,253,0.18)' : '1px solid rgba(255,255,255,0.7)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: mode === 'dark' ? 'rgba(20, 16, 36, 0.72)' : 'rgba(255,255,255,0.72)',
            transition: 'all 0.2s ease',
            '& fieldset': { borderColor: 'rgba(244, 63, 94, 0.32)' },
            '&:hover fieldset': { borderColor: 'rgba(244, 63, 94, 0.58)' },
            '&.Mui-focused fieldset': { borderColor: '#F43F5E', boxShadow: '0 0 0 4px rgba(244, 63, 94, 0.12)' },
          },
        },
      },
    },
  },
});

function MainContent({ mode, setMode }) {
  const { user, logout } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasCycleData, setHasCycleData] = useState(false);
  const isDark = mode === 'dark';
  const toggleMode = () => setMode((current) => {
    const nextMode = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('lunaflow-theme', nextMode);
    return nextMode;
  });

  useEffect(() => {
    if (!user) {
      setHasCycleData(false);
      return undefined;
    }

    let isCurrent = true;
    api.get(`/cycles/recent`, { params: { page: 0, size: 1 } })
      .then((res) => {
        if (isCurrent) setHasCycleData(res.data.length > 0);
      })
      .catch(() => {
        if (isCurrent) setHasCycleData(false);
      });

    return () => { isCurrent = false; };
  }, [user, refreshKey]);

  if (!user) return <LoginButton mode={mode} setMode={setMode} />;

  const handleDataUpdated = () => setRefreshKey((previous) => previous + 1);
  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'User';

  return (
    <Box sx={{ minHeight: '100vh', background: isDark ? 'radial-gradient(circle at top, #2B1A3D 0%, #171326 52%, #111322 100%)' : 'radial-gradient(circle at top, rgba(255,255,255,0.98) 0%, rgba(255, 241, 242, 0.95) 28%, rgba(245, 243, 255, 0.97) 64%, rgba(255, 247, 237, 1) 100%)', position: 'relative', display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease', '&::before': { content: '""', position: 'absolute', inset: 0, backgroundImage: isDark ? 'radial-gradient(circle at 16% 18%, rgba(244, 63, 94, 0.16) 0, transparent 22%), radial-gradient(circle at 84% 0%, rgba(124, 58, 237, 0.22) 0, transparent 24%)' : 'radial-gradient(circle at 16% 18%, rgba(244, 63, 94, 0.14) 0, transparent 22%), radial-gradient(circle at 84% 0%, rgba(124, 58, 237, 0.13) 0, transparent 24%), radial-gradient(circle at 50% 100%, rgba(249, 115, 22, 0.1) 0, transparent 22%)', zIndex: 0 } }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 1, sm: 2 }, px: { xs: 1, sm: 2 }, flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: { xs: 3.5, sm: 3 }, gap: { xs: 2, sm: 0 }, px: { xs: 1, sm: 1 }, width: '100%' }}>
          <Typography variant="h5" sx={{ color: isDark ? '#F8F7FF' : '#312E81', fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.5rem' }, lineHeight: 1.2, textAlign: 'center' }}>
            Welcome, {firstName}!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1.5, sm: 1 } }}>
            <Button onClick={toggleMode} variant="outlined" size="small" aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} sx={{ minWidth: 46, width: 46, height: 46, p: 0, borderRadius: 999, color: isDark ? '#FDE68A' : '#BE123C', borderColor: isDark ? 'rgba(253,230,138,0.48)' : 'rgba(244,63,94,0.38)', background: 'transparent', boxShadow: 'none' }}>
              {isDark ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
            </Button>
            <Button onClick={logout} variant="contained" size="small" sx={{ px: { xs: 3.5, sm: 3 }, py: { xs: 0.8, sm: 0.8 }, minWidth: { xs: 112, sm: 'auto' }, fontSize: { xs: '0.82rem', sm: '0.95rem' } }}>
              LOGOUT
            </Button>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, mb: 0.5 }}>
            <AutoAwesomeRoundedIcon sx={{ color: '#F43F5E', fontSize: { xs: 20, sm: 24 } }} />
            <Typography variant="h4" sx={{ color: isDark ? '#F8F7FF' : '#312E81', fontWeight: 800, fontSize: { xs: '1.65rem', sm: '2rem', md: '2.5rem' }, textShadow: '0 10px 30px rgba(244, 63, 94, 0.16)' }}>
              LunaFlow
            </Typography>
          </Box>
          <Typography sx={{ color: isDark ? '#C4B5FD' : '#7C3AED', fontWeight: 600, fontSize: { xs: '0.82rem', sm: '0.95rem' } }}>
            Cycle care, made beautifully simple.
          </Typography>
        </Box>

        <PeriodForm onTracked={handleDataUpdated} />

        {hasCycleData && (
          <>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' }, gap: { xs: 3, sm: 4 }, mt: { xs: 4, sm: 6 }, alignItems: 'start' }}>
              <HistoryList refreshKey={refreshKey} onDataUpdated={handleDataUpdated} />
              <CycleChart refreshKey={refreshKey} />
            </Box>
            <Box sx={{ mt: { xs: 3, sm: 4 } }}><PredictionBox refreshKey={refreshKey} /></Box>
            <FutureCyclePrediction refreshKey={refreshKey} />
          </>
        )}
      </Container>

      <Box sx={{ textAlign: 'center', py: { xs: 2, sm: 3 }, mt: 'auto', background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(254, 205, 211, 0.3) 100%)', borderTop: '1px solid rgba(244, 63, 94, 0.18)', backdropFilter: 'blur(10px)' }}>
        <Typography variant="body2" sx={{ color: isDark ? '#C4B5FD' : '#312E81', fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.875rem' }, letterSpacing: '0.02em' }}>
          Made with ❤️ by Ridam - Copyright 2025-26
        </Typography>
      </Box>
    </Box>
  );
}

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('lunaflow-theme') || 'dark');
  return <ThemeProvider theme={createAppTheme(mode)}><CssBaseline /><AuthProvider><MainContent mode={mode} setMode={setMode} /></AuthProvider></ThemeProvider>;
}
