import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginButton() {
  const handleLogin = () => signInWithPopup(auth, provider);

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleLogin}
      sx={{ mt: 4 }}
      fullWidth
    >
      Sign in with Google
    </Button>
  );
} 