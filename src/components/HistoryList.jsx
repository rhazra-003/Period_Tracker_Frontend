import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, Box } from "@mui/material";

export default function HistoryList() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const fetchRecords = async (pageNum = 1) => {
    setError("");
    try {
      const res = await api.get(`/cycles/recent`, {
        params: { page: pageNum - 1, size: 10 },
      });
      setRecords(res.data);
      setTotalPages(res.data.length === 10 ? pageNum + 1 : pageNum); // crude estimate
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching history");
      setRecords([]);
    }
  };

  useEffect(() => {
    fetchRecords(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" align="center">Tracking History</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>First Day</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Cycle Length</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((rec, idx) => (
              <TableRow key={idx}>
                <TableCell>{rec.periodStart}</TableCell>
                <TableCell>{rec.duration}</TableCell>
                <TableCell>{rec.cycleLength ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, val) => setPage(val)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
} 