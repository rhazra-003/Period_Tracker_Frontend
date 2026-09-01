import React from "react";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Typography, Container } from "@mui/material";

export default function LoginButton() {
  const handleLogin = () => signInWithPopup(auth, provider);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, rgba(255,255,255,0.98) 0%, rgba(255, 240, 248, 0.96) 25%, rgba(245, 243, 255, 0.98) 65%, rgba(255, 247, 251, 1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(236, 72, 153, 0.16) 0, transparent 25%), radial-gradient(circle at 80% 15%, rgba(168, 85, 247, 0.12) 0, transparent 28%)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 5,
          background: 'rgba(255,255,255,0.52)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 22px 60px rgba(168, 85, 247, 0.12)',
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#A21CAF',
              fontWeight: 800,
              mb: { xs: 2, sm: 3 },
              textShadow: '0 10px 25px rgba(236, 72, 153, 0.14)',
              fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
              letterSpacing: '-0.05em',
            }}
          >
            Period Tracker
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#6D28D9',
              mb: { xs: 3, sm: 4 },
              opacity: 0.85,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              fontWeight: 500,
            }}
          >
            Track your menstrual cycle with ease
          </Typography>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
            size="large"
            sx={{ 
              px: { xs: 3, sm: 4 },
              py: { xs: 1.15, sm: 1.4 },
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              borderRadius: 999,
              boxShadow: '0 14px 28px rgba(236, 72, 153, 0.24)',
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 