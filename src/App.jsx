import React from "react";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import LoginButton from "./components/LoginButton";
import PeriodForm from "./components/PeriodForm";
import HistoryList from "./components/HistoryList";
import CycleChart from "./components/CycleChart";
import PredictionBox from "./components/PredictionBox";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function MainContent() {
  const { user, logout } = useAuth();

  if (!user) return <LoginButton />;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Welcome, {user.displayName}
      </Typography>
      <Button onClick={logout} sx={{ float: "right", mt: 2 }}>
        Logout
      </Button>
      <PeriodForm />
      <HistoryList />
      <CycleChart />
      <PredictionBox />
    </Container>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
} 