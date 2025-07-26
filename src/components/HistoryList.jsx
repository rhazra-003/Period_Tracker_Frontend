import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, Box } from "@mui/material";
import dayjs from "dayjs";

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

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  return (
    <Box sx={{ mt: { xs: 3, sm: 5 } }}>
      <Typography 
        variant="h6" 
        align="center" 
        sx={{ 
          color: '#C71585',
          fontWeight: 600,
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}
      >
        Tracking History
      </Typography>
      {error && (
        <Typography 
          color="error" 
          sx={{ 
            textAlign: 'center',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            p: { xs: 0.5, sm: 1 },
            borderRadius: 1,
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {error}
        </Typography>
      )}
      <TableContainer 
        component={Paper} 
        sx={{ 
          mt: { xs: 1, sm: 2 },
          backgroundColor: '#FFFFFF',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(255, 105, 180, 0.1)',
          maxHeight: { xs: '300px', sm: '400px' },
          overflow: 'auto'
        }}
      >
        <Table size="small" sx={{ minWidth: { xs: 250, sm: 400 } }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FFF5F5' }}>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 600,
                  color: '#C71585',
                  borderBottom: '2px solid #FFB6C1',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  padding: { xs: '8px 4px', sm: '16px' }
                }}
              >
                Period Date
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 600,
                  color: '#C71585',
                  borderBottom: '2px solid #FFB6C1',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  padding: { xs: '8px 4px', sm: '16px' }
                }}
              >
                Duration (Days)
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 600,
                  color: '#C71585',
                  borderBottom: '2px solid #FFB6C1',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  padding: { xs: '8px 4px', sm: '16px' }
                }}
              >
                Cycle Length (Days)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((rec, idx) => (
              <TableRow 
                key={idx}
                sx={{ 
                  '&:nth-of-type(odd)': { backgroundColor: '#FFF5F5' },
                  '&:hover': { backgroundColor: '#FFFACD' }
                }}
              >
                <TableCell 
                  align="center" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    padding: { xs: '6px 4px', sm: '16px' }
                  }}
                >
                  {formatDate(rec.periodStart)}
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    padding: { xs: '6px 4px', sm: '16px' }
                  }}
                >
                  {rec.duration}
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    padding: { xs: '6px 4px', sm: '16px' }
                  }}
                >
                  {rec.cycleLength ?? "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, val) => setPage(val)}
        size="small"
        sx={{ 
          mt: { xs: 1, sm: 2 }, 
          display: "flex", 
          justifyContent: "center",
          '& .MuiPaginationItem-root': {
            color: '#C71585',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            '&.Mui-selected': {
              backgroundColor: '#FFB6C1',
              color: '#C71585',
            },
            '&:hover': {
              backgroundColor: '#FFFACD',
            }
          }
        }}
      />
    </Box>
  );
} 