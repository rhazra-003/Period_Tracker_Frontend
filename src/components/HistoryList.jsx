import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

export default function HistoryList({ refreshKey = 0, onDataUpdated }) {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchRecords = async (pageNum = 1) => {
    setError("");
    try {
      const res = await api.get(`/cycles/recent`, {
        params: { page: pageNum - 1, size: 10 },
      });
      setRecords(res.data);
      setTotalPages(res.data.length === 10 ? pageNum + 1 : pageNum);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching history");
      setRecords([]);
    }
  };

  useEffect(() => {
    fetchRecords(page);
    // eslint-disable-next-line
  }, [page, refreshKey]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setDeleteError("");
    try {
      await api.delete(`/cycles/${deleteTarget.id}`);
      setDeleteSuccess("Entry deleted successfully!");
      setDeleteTarget(null);
      if (onDataUpdated) {
        onDataUpdated();
      }
      setTimeout(() => setDeleteSuccess(""), 1800);
    } catch (err) {
      setDeleteError(err.response?.data?.error || "Failed to delete entry");
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString) => dayjs(dateString).format("DD/MM/YYYY");

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
      {deleteSuccess && (
        <Typography 
          color="success.main" 
          sx={{ 
            textAlign: 'center',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            p: { xs: 0.5, sm: 1 },
            borderRadius: 1,
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {deleteSuccess}
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
              <TableCell align="center" sx={{ fontWeight: 600, color: '#C71585', borderBottom: '2px solid #FFB6C1', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' } }}>
                Period Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#C71585', borderBottom: '2px solid #FFB6C1', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' } }}>
                Duration (Days)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#C71585', borderBottom: '2px solid #FFB6C1', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' } }}>
                Cycle Length (Days)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#C71585', borderBottom: '2px solid #FFB6C1', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' }, width: 60 }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((rec) => (
              <TableRow key={rec.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#FFF5F5' }, '&:hover': { backgroundColor: '#FFFACD' } }}>
                <TableCell align="center" sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '6px 4px', sm: '16px' } }}>
                  {formatDate(rec.periodStart)}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '6px 4px', sm: '16px' } }}>
                  {rec.duration}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '6px 4px', sm: '16px' } }}>
                  {rec.cycleLength ?? "-"}
                </TableCell>
                <TableCell align="center" sx={{ padding: { xs: '6px 4px', sm: '16px' }, width: 60 }}>
                  <IconButton
                    color="error"
                    aria-label="delete entry"
                    onClick={() => setDeleteTarget(rec)}
                    sx={{ color: '#C71585', '&:hover': { backgroundColor: 'rgba(199, 21, 133, 0.08)' } }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#C71585', fontWeight: 700 }}>Are you sure you want to delete this entry?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#333' }}>
            This action is irreversible. Once deleted, the cycle entry cannot be recovered.
          </DialogContentText>
          {deleteError && (
            <Typography color="error" sx={{ mt: 2, fontSize: '0.85rem' }}>
              {deleteError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              setDeleteTarget(null);
              setDeleteError("");
            }}
            color="inherit"
            variant="outlined"
            sx={{ borderColor: '#C71585', color: '#C71585' }}
          >
            No Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            sx={{ backgroundColor: '#C71585', '&:hover': { backgroundColor: '#A40F67' } }}
          >
            {deleteLoading ? 'Processing...' : 'Yes Continue'}
          </Button>
        </DialogActions>
      </Dialog>
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