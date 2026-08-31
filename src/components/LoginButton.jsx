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
        background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFACD 50%, #FFFFFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
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
      <Container maxWidth="sm" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        px: { xs: 2, sm: 3 }
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#C71585',
            fontWeight: 700,
            mb: { xs: 3, sm: 4 },
            textShadow: '2px 2px 4px rgba(255, 105, 180, 0.2)',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Period Tracker
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#C71585',
            mb: { xs: 3, sm: 4 },
            opacity: 0.8,
            fontSize: { xs: '1rem', sm: '1.25rem' }
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
            py: { xs: 1, sm: 1.5 },
            backgroundColor: '#FF69B4',
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#C71585',
            }
          }}
        >
          Sign in with Google
        </Button>
      </Container>
    </Box>
  );
} 