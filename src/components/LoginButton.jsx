import React from "react";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import { Box, Typography, Container, Chip, Divider } from "@mui/material";

export default function LoginButton({ mode, setMode }) {
  const handleLogin = () => signInWithPopup(auth, provider);
  const isDark = mode === 'dark';
  const toggleMode = () => setMode((current) => {
    const nextMode = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('lunaflow-theme', nextMode);
    return nextMode;
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark ? 'radial-gradient(circle at top, #2B1A3D 0%, #171326 52%, #111322 100%)' : 'radial-gradient(circle at top, #FFFFFF 0%, #FFF1F2 34%, #F5F3FF 72%, #FFF7ED 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark ? 'radial-gradient(circle at 15% 20%, rgba(244, 63, 94, 0.2) 0, transparent 25%), radial-gradient(circle at 82% 15%, rgba(124, 58, 237, 0.22) 0, transparent 28%)' : 'radial-gradient(circle at 15% 20%, rgba(244, 63, 94, 0.16) 0, transparent 25%), radial-gradient(circle at 82% 15%, rgba(124, 58, 237, 0.14) 0, transparent 28%)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        px: { xs: 2, sm: 4 },
        py: { xs: 7, sm: 8 },
      }}>
        <Button
          onClick={toggleMode}
          variant="outlined"
          size="small"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          sx={{ position: 'fixed', top: { xs: 16, sm: 24 }, right: { xs: 16, sm: 24 }, minWidth: 42, width: 42, height: 42, p: 0, color: isDark ? '#FDE68A' : '#BE123C', borderColor: isDark ? 'rgba(253,230,138,0.48)' : 'rgba(244,63,94,0.38)', background: 'transparent', boxShadow: 'none' }}
        >
          {isDark ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
        </Button>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' }, gap: { xs: 3, md: 6 }, alignItems: 'center' }}>
          <Box sx={{ color: isDark ? '#F8F7FF' : '#312E81', pr: { md: 3 } }}>
            <Chip label="YOUR CYCLE, YOUR RHYTHM" sx={{ mb: 2.5, color: isDark ? '#FDE68A' : '#BE123C', backgroundColor: isDark ? 'rgba(253,230,138,0.12)' : 'rgba(244,63,94,0.1)', fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.68rem' }} />
            <Typography variant="h3" sx={{ color: isDark ? '#F8F7FF' : '#312E81', fontWeight: 800, mb: 2, fontFamily: 'Fraunces, Georgia, serif', textShadow: '0 10px 25px rgba(244, 63, 94, 0.15)', fontSize: { xs: '2.4rem', sm: '3.3rem', md: '4.3rem' }, lineHeight: 1.02, letterSpacing: '-0.05em' }}>
              Meet LunaFlow.
            </Typography>
            <Typography sx={{ color: isDark ? '#DDD6FE' : '#4338CA', maxWidth: 560, mb: 3, fontSize: { xs: '1rem', sm: '1.15rem' }, lineHeight: 1.65 }}>
              A calm, private space to understand your cycle, spot patterns, and plan the month ahead with more confidence.
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              {[
                { icon: <CalendarMonthRoundedIcon />, title: 'Track simply', text: 'Log period dates and duration in seconds.' },
                { icon: <AutoGraphRoundedIcon />, title: 'See patterns', text: 'Follow your recent cycle history and trends.' },
                { icon: <FavoriteBorderRoundedIcon />, title: 'Plan ahead', text: 'Explore fertile-window and phase estimates.' },
                { icon: <HealthAndSafetyRoundedIcon />, title: 'Stay informed', text: 'Use insights alongside your own body awareness.' },
              ].map((item) => (
                <Box key={item.title} sx={{ display: 'flex', gap: 1.2, p: 1.5, borderRadius: 3, background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.58)', border: isDark ? '1px solid rgba(196,181,253,0.14)' : '1px solid rgba(255,255,255,0.8)' }}>
                  <Box sx={{ color: '#F43F5E', display: 'flex', pt: 0.2 }}>{item.icon}</Box>
                  <Box>
                    <Typography sx={{ color: isDark ? '#F8F7FF' : '#312E81', fontWeight: 700, fontSize: '0.86rem' }}>{item.title}</Typography>
                    <Typography sx={{ color: isDark ? '#C4B5FD' : '#6B7280', fontSize: '0.74rem', lineHeight: 1.4 }}>{item.text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 4 }, borderRadius: 5, background: isDark ? 'rgba(31,25,52,0.86)' : 'rgba(255,255,255,0.68)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', border: isDark ? '1px solid rgba(196,181,253,0.18)' : '1px solid rgba(255,255,255,0.84)', boxShadow: '0 22px 60px rgba(190, 24, 93, 0.14)' }}>
            <Typography variant="h5" sx={{ color: isDark ? '#F8F7FF' : '#312E81', fontWeight: 800, fontFamily: 'Fraunces, Georgia, serif', mb: 1 }}>
              Start with one entry.
            </Typography>
            <Typography sx={{ color: isDark ? '#C4B5FD' : '#6B7280', fontSize: '0.86rem', lineHeight: 1.55, mb: 2.5 }}>
              Sign in, add the first day of your latest period, and LunaFlow will build your personal view over time.
            </Typography>
            <Button variant="contained" startIcon={<GoogleIcon />} onClick={handleLogin} size="large" fullWidth sx={{ py: 1.35, fontSize: '1rem', mb: 2 }}>
              Sign in with Google
            </Button>
            <Divider sx={{ borderColor: isDark ? 'rgba(196,181,253,0.18)' : 'rgba(49,46,129,0.1)', mb: 2 }} />
            <Typography sx={{ color: isDark ? '#C4B5FD' : '#6B7280', fontSize: '0.74rem', lineHeight: 1.5 }}>
              Your cycle is personal. Predictions are estimates, not medical advice, and can vary with stress, illness, medication, and life changes.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 4, sm: 5 }, mx: 'auto', maxWidth: 980, p: { xs: 2, sm: 2.5 }, borderRadius: 3, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.48)', border: isDark ? '1px solid rgba(196,181,253,0.14)' : '1px solid rgba(255,255,255,0.72)', textAlign: 'left' }}>
          <Typography sx={{ color: isDark ? '#FDE68A' : '#C2410C', fontWeight: 800, fontSize: '0.8rem', mb: 0.5 }}>A gentle health note</Typography>
          <Typography sx={{ color: isDark ? '#DDD6FE' : '#6B7280', fontSize: '0.76rem', lineHeight: 1.55 }}>
            Cycles differ from person to person and may change over time. Seek medical support for severe pain, unusually heavy bleeding, sudden major changes, or concerns that persist. If you feel unsafe or unwell, contact a qualified healthcare professional.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 