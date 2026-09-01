import React, { useState } from "react";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import LoginButton from "./components/LoginButton";
import PeriodForm from "./components/PeriodForm";
import HistoryList from "./components/HistoryList";
import CycleChart from "./components/CycleChart";
import PredictionBox from "./components/PredictionBox";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Create a glossy, modern period-tracker theme while preserving the pink wellness aesthetic.
const theme = createTheme({
  palette: {
    primary: {
      main: '#EC4899',
      light: '#F9A8D4',
      dark: '#BE185D',
    },
    secondary: {
      main: '#FDF2F8',
      light: '#FFF7FB',
      dark: '#FBCFE8',
    },
    background: {
      default: '#FCE7F3',
      paper: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: '#4C1D95',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", sans-serif',
    h4: {
      color: '#A21CAF',
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h5: {
      color: '#A21CAF',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h6: {
      color: '#A21CAF',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #fff7fb 0%, #fdf2f8 22%, #f5f3ff 60%, #fdf2f8 100%)',
          color: '#4C1D95',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: '0 12px 24px rgba(236, 72, 153, 0.22)',
          background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 100%)',
            boxShadow: '0 16px 28px rgba(236, 72, 153, 0.28)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 18px 45px rgba(168, 85, 247, 0.12)',
          border: '1px solid rgba(255,255,255,0.7)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: 'rgba(255,255,255,0.72)',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(236, 72, 153, 0.32)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(236, 72, 153, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#EC4899',
              boxShadow: '0 0 0 4px rgba(236, 72, 153, 0.12)',
            },
          },
        },
      },
    },
  },
});

function MainContent() {
  const { user, logout } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!user) return <LoginButton />;

  const handleDataUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Extract first name from display name
  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'User';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, rgba(255,255,255,0.95) 0%, rgba(255, 240, 248, 0.94) 20%, rgba(245, 243, 255, 0.95) 58%, rgba(255, 247, 251, 1) 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.12) 0, transparent 22%), radial-gradient(circle at 80% 0%, rgba(168, 85, 247, 0.14) 0, transparent 24%), radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.08) 0, transparent 22%)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 1, sm: 2 }, px: { xs: 1, sm: 2 }, flex: 1 }}>
        {/* Header Row */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', sm: 'center' },
          mb: { xs: 2, sm: 3 },
          gap: { xs: 1, sm: 0 },
          px: { xs: 0.5, sm: 1 },
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#A21CAF',
              fontWeight: 700,
              fontSize: { xs: '1.15rem', sm: '1.5rem' },
              textAlign: { xs: 'center', sm: 'left' },
              letterSpacing: '-0.02em',
            }}
          >
            Welcome, {firstName}!
          </Typography>
          <Button 
            onClick={logout} 
            variant="contained"
            size="small"
            sx={{ 
              px: { xs: 2.5, sm: 3 },
              py: { xs: 0.6, sm: 0.8 },
              fontSize: { xs: '0.8rem', sm: '0.95rem' },
              background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 100%)',
              }
            }}
          >
            LOGOUT
          </Button>
        </Box>

        {/* Title Row */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#A21CAF',
              fontWeight: 800,
              fontSize: { xs: '1.65rem', sm: '2rem', md: '2.5rem' },
              textShadow: '0 10px 30px rgba(236, 72, 153, 0.14)',
              letterSpacing: '-0.04em',
            }}
          >
            Track Your Period
          </Typography>
        </Box>

        {/* Form Section */}
        <PeriodForm onTracked={handleDataUpdated} />

        {/* History and Chart Section - Side by Side */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
          gap: { xs: 3, sm: 4 }, 
          mt: { xs: 4, sm: 6 },
          alignItems: 'start'
        }}>
          <HistoryList refreshKey={refreshKey} onDataUpdated={handleDataUpdated} />
          <CycleChart refreshKey={refreshKey} />
        </Box>

        {/* Prediction Box */}
        <Box sx={{ mt: { xs: 3, sm: 4 } }}>
          <PredictionBox refreshKey={refreshKey} />
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: { xs: 2, sm: 3 }, 
          mt: 'auto',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.44) 0%, rgba(251, 207, 232, 0.28) 100%)',
          borderTop: '1px solid rgba(236, 72, 153, 0.18)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#A21CAF',
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            letterSpacing: '0.02em',
          }}
        >
          Made with ❤️ by Ridam - Copyright 2025-26
        </Typography>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
} 