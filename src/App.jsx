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

// Create a period-centric theme with warm colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // Hot pink
      light: '#FFB6C1', // Light pink
      dark: '#C71585', // Medium violet red
    },
    secondary: {
      main: '#FFFACD', // Lemon chiffon
      light: '#FFFFF0', // Ivory
      dark: '#F0E68C', // Khaki
    },
    background: {
      default: '#FFF5F5', // Very light pink
      paper: '#FFFFFF',
    },
  },
  typography: {
    h4: {
      color: '#C71585',
      fontWeight: 600,
    },
    h6: {
      color: '#C71585',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: '0 4px 20px rgba(255, 105, 180, 0.1)',
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
        background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFACD 50%, #FFFFFF 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFB6C1" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
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
          gap: { xs: 1, sm: 0 }
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#C71585',
              fontWeight: 600,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Welcome, {firstName}!
          </Typography>
          <Button 
            onClick={logout} 
            variant="outlined"
            size="small"
            sx={{ 
              color: '#C71585',
              borderColor: '#C71585',
              fontSize: { xs: '0.8rem', sm: '1rem' },
              px: { xs: 2, sm: 3 },
              '&:hover': {
                borderColor: '#C71585',
                backgroundColor: 'rgba(199, 21, 133, 0.1)',
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
              color: '#C71585',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              textShadow: '2px 2px 4px rgba(255, 105, 180, 0.2)'
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
          backgroundColor: 'rgba(255, 105, 180, 0.1)',
          borderTop: '1px solid rgba(255, 105, 180, 0.2)'
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#C71585',
            fontWeight: 500,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          Made with ❤️ by Ridam - Copyright 2025
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