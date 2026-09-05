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
  useTheme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

export default function HistoryList({ refreshKey = 0, onDataUpdated }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
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
          color: isDark ? '#F8F7FF' : '#312E81',
          fontWeight: 700,
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          letterSpacing: '-0.02em',
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
          background: isDark ? 'rgba(31,25,52,0.82)' : 'rgba(255,255,255,0.7)',
          borderRadius: 4,
          boxShadow: '0 20px 45px rgba(190, 24, 93, 0.13)',
          border: '1px solid rgba(255,255,255,0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          maxHeight: { xs: '300px', sm: '400px' },
          overflow: 'auto',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 24px 60px rgba(190, 24, 93, 0.18)',
          }
        }}
      >
        <Table size="small" sx={{ minWidth: { xs: 250, sm: 400 } }}>
          <TableHead>
            <TableRow sx={{ background: isDark ? 'linear-gradient(135deg, rgba(49, 46, 129, 0.88), rgba(88, 28, 135, 0.88))' : 'linear-gradient(135deg, rgba(255,240,248,0.9), rgba(245,243,255,0.9))' }}>
              <TableCell align="center" sx={{ fontWeight: 700, color: isDark ? '#F8F7FF' : '#312E81', borderBottom: '2px solid rgba(244, 63, 94, 0.28)', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' } }}>
                Period Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: isDark ? '#F8F7FF' : '#312E81', borderBottom: '2px solid rgba(244, 63, 94, 0.28)', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' } }}>
                Duration (Days)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: isDark ? '#F8F7FF' : '#312E81', borderBottom: '2px solid rgba(244, 63, 94, 0.28)', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' } }}>
                Cycle Length (Days)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: isDark ? '#F8F7FF' : '#312E81', borderBottom: '2px solid rgba(244, 63, 94, 0.28)', fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '8px 4px', sm: '16px' }, width: 60 }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((rec) => (
              <TableRow key={rec.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(255, 240, 248, 0.5)' }, '&:hover': { background: 'linear-gradient(135deg, rgba(251, 207, 232, 0.45), rgba(233, 213, 255, 0.4))', transition: 'all 0.2s ease' } }}>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '6px 4px', sm: '16px' }, color: isDark ? '#F8F7FF' : '#4C1D95' }}>
                  {formatDate(rec.periodStart)}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '6px 4px', sm: '16px' }, color: isDark ? '#F8F7FF' : '#4C1D95' }}>
                  {rec.duration}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '6px 4px', sm: '16px' }, color: isDark ? '#F8F7FF' : '#4C1D95' }}>
                  {rec.cycleLength ?? "-"}
                </TableCell>
                <TableCell align="center" sx={{ padding: { xs: '6px 4px', sm: '16px' }, width: 60 }}>
                  <IconButton
                    color="error"
                    aria-label="delete entry"
                    onClick={() => setDeleteTarget(rec)}
                    sx={{ color: '#DB2777', borderRadius: 999, '&:hover': { backgroundColor: 'rgba(236, 72, 153, 0.1)', transform: 'scale(1.06)' }, transition: 'all 0.2s ease' }}
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
        <DialogTitle sx={{ color: '#312E81', fontWeight: 700 }}>Are you sure you want to delete this entry?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#4C1D95' }}>
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
            sx={{ borderColor: '#F43F5E', color: '#BE123C', borderRadius: 999 }}
          >
            No Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            sx={{ background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', borderRadius: 999, '&:hover': { background: 'linear-gradient(135deg, #DB2777 0%, #BE185D 100%)' } }}
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
            color: '#A21CAF',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            borderRadius: 999,
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #F9A8D4 0%, #FBCFE8 100%)',
              color: '#A21CAF',
              fontWeight: 700,
              boxShadow: '0 10px 20px rgba(236, 72, 153, 0.12)',
            },
            '&:hover': {
              backgroundColor: 'rgba(236, 72, 153, 0.08)',
            }
          }
        }}
      />
    </Box>
  );
} 