import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
} from "@mui/material";
import businessUnitData from "../data/businessUnitData.json";

interface BusinessUnit {
  id: number;
  name: string;
  code: string;
}

const BusinessUnitPage: React.FC = () => {
  const theme = useTheme();

  // Load localStorage & JSON, remove duplicates, ensure numeric IDs
  const [units, setUnits] = useState<BusinessUnit[]>(() => {
    const saved = localStorage.getItem("businessUnits");
    const savedUnits: BusinessUnit[] = saved
      ? JSON.parse(saved).map((u: any) => ({
          ...u,
          id: Number(u.id),
          name: u.name.trim(),
          code: u.code.trim(),
        }))
      : [];

    const merged = [
      ...businessUnitData.map((u) => ({
        ...u,
        id: Number(u.id),
        name: u.name.trim(),
        code: u.code.trim(),
      })),
      ...savedUnits,
    ];

    // Deduplicate by name+code (case-insensitive)
    const deduped: BusinessUnit[] = [];
    const seen = new Set<string>();
    for (const u of merged) {
      const key = `${u.name.toLowerCase()}|${u.code.toLowerCase()}`;
      if (!seen.has(key)) {
        deduped.push(u);
        seen.add(key);
      }
    }

    return deduped;
  });

  const [expandedUnit, setExpandedUnit] = useState<BusinessUnit | null>(null);
  const [editUnit, setEditUnit] = useState<BusinessUnit | null>(null);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("businessUnits", JSON.stringify(units));
  }, [units]);

  const handleShowDetails = (unit: BusinessUnit) => setExpandedUnit(unit);
  const handleCloseDetails = () => setExpandedUnit(null);

  const handleEdit = (unit: BusinessUnit) => setEditUnit(unit);
  const handleCloseEdit = () => setEditUnit(null);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this business unit?")) {
      setUnits((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleSaveEdit = () => {
    if (!editUnit) return;

    const trimmedName = editUnit.name.trim();
    const trimmedCode = editUnit.code.trim();

    // Prevent duplicates
    const isDuplicate = units.some(
      (u) =>
        u.id !== editUnit.id &&
        u.name.toLowerCase() === trimmedName.toLowerCase() &&
        u.code.toLowerCase() === trimmedCode.toLowerCase()
    );
    if (isDuplicate) {
      alert("A business unit with the same name and code already exists.");
      return;
    }

    setUnits((prev) =>
      prev.map((u) =>
        u.id === editUnit.id
          ? { ...editUnit, name: trimmedName, code: trimmedCode }
          : u
      )
    );
    setEditUnit(null);
  };

  const handleAddNew = () => {
    setNewName("");
    setNewCode("");
    setIsNewDialogOpen(true);
  };

  const handleSaveNew = () => {
    const trimmedName = newName.trim();
    const trimmedCode = newCode.trim();
    if (!trimmedName) return;

    // Prevent duplicates
    const isDuplicate = units.some(
      (u) =>
        u.name.toLowerCase() === trimmedName.toLowerCase() &&
        u.code.toLowerCase() === trimmedCode.toLowerCase()
    );
    if (isDuplicate) {
      alert("A business unit with the same name and code already exists.");
      return;
    }

    const newUnit: BusinessUnit = {
      id: Date.now(),
      name: trimmedName,
      code: trimmedCode,
    };

    setUnits((prev) => [...prev, newUnit]);
    setIsNewDialogOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        overflow: "hidden",
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: 3,
          borderRadius: 4,
          width: "100%",
          maxWidth: 1200,
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          📊 Business Units
        </Typography>

        <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddNew}>
          Add New Business Unit
        </Button>

        <TableContainer
          component={Paper}
          sx={{ bgcolor: theme.palette.background.paper, width: "100%", mx: 0 }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Name", "Code", "Actions"].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id} hover>
                  <TableCell>{unit.name || "-"}</TableCell>
                  <TableCell>{unit.code || "-"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleShowDetails(unit)}
                      >
                        Show Details
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleEdit(unit)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleDelete(unit.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Show Details Dialog */}
      <Dialog open={!!expandedUnit} onClose={handleCloseDetails} fullWidth maxWidth="sm">
        <DialogTitle>Business Unit Details</DialogTitle>
        <DialogContent dividers>
          {expandedUnit && (
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Name</TableCell>
                  <TableCell>{expandedUnit.name || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Code</TableCell>
                  <TableCell>{expandedUnit.code || "-"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editUnit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>Update Business Unit</DialogTitle>
        <DialogContent dividers>
          {editUnit && (
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={editUnit.name}
                onChange={(e) => setEditUnit({ ...editUnit, name: e.target.value })}
                fullWidth
              />
              <TextField
                label="Code"
                value={editUnit.code}
                onChange={(e) => setEditUnit({ ...editUnit, code: e.target.value })}
                fullWidth
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Dialog */}
      <Dialog open={isNewDialogOpen} onClose={() => setIsNewDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Business Unit</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Code"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveNew}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessUnitPage;
