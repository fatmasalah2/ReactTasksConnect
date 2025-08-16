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
import activeDirectoryData from "../data/activeDirectoryData.json";

interface ActiveDirectory {
  id: number;
  name: string;
  description: string;
}

const ActiveDirectoryPage: React.FC = () => {
  const theme = useTheme();

  // Load from localStorage or fallback to JSON data
  const [directories, setDirectories] = useState<ActiveDirectory[]>(() => {
    const saved = localStorage.getItem("directories");
    return saved ? JSON.parse(saved) : activeDirectoryData;
  });

  const [expandedDirectory, setExpandedDirectory] = useState<ActiveDirectory | null>(null);
  const [editDirectory, setEditDirectory] = useState<ActiveDirectory | null>(null);

  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("directories", JSON.stringify(directories));
  }, [directories]);

  const handleShowDetails = (dir: ActiveDirectory) => setExpandedDirectory(dir);
  const handleCloseDetails = () => setExpandedDirectory(null);

  const handleEdit = (dir: ActiveDirectory) => setEditDirectory(dir);
  const handleCloseEdit = () => setEditDirectory(null);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this directory?")) {
      setDirectories((prev) => prev.filter((dir) => dir.id !== id));
    }
  };

  const handleSaveEdit = () => {
    if (editDirectory) {
      setDirectories((prev) =>
        prev.map((dir) => (dir.id === editDirectory.id ? editDirectory : dir))
      );
      setEditDirectory(null);
    }
  };

  const handleAddNew = () => {
    setNewName("");
    setNewDescription("");
    setIsNewDialogOpen(true);
  };

  const handleSaveNew = () => {
    if (!newName.trim()) return;
    const newDir: ActiveDirectory = {
      id: Date.now(),
      name: newName.trim(),
      description: newDescription.trim(),
    };
    setDirectories((prev) => [...prev, newDir]);
    setIsNewDialogOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: theme.palette.mode === "light"
          ? "linear-gradient(135deg, #e3f2fd, #bbdefb, #90caf9)"
          : "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        overflow: "hidden",
        p: 2,
        transition: "background 0.3s ease",
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
          🗄️ Active Directory
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 2, textTransform: "none" }}
          onClick={handleAddNew}
        >
          Add New Directory
        </Button>

        <TableContainer
          component={Paper}
          sx={{
            bgcolor: theme.palette.background.paper,
            width: "100%",
            mx: 0,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {["Name", "Description", "Actions"].map((header) => (
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
              {directories.map((dir) => (
                <TableRow key={dir.id} hover>
                  <TableCell>{dir.name || "-"}</TableCell>
                  <TableCell>{dir.description || "-"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleShowDetails(dir)}
                      >
                        Show Details
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleEdit(dir)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleDelete(dir.id)}
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
      <Dialog open={!!expandedDirectory} onClose={handleCloseDetails} fullWidth maxWidth="sm">
        <DialogTitle>Active Directory Details</DialogTitle>
        <DialogContent dividers>
          {expandedDirectory && (
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Name</TableCell>
                  <TableCell>{expandedDirectory.name || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Description</TableCell>
                  <TableCell>{expandedDirectory.description || "-"}</TableCell>
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
      <Dialog open={!!editDirectory} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>Update Directory</DialogTitle>
        <DialogContent dividers>
          {editDirectory && (
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={editDirectory.name}
                onChange={(e) =>
                  setEditDirectory({ ...editDirectory, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Description"
                value={editDirectory.description}
                onChange={(e) =>
                  setEditDirectory({ ...editDirectory, description: e.target.value })
                }
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
        <DialogTitle>Add New Directory</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
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

export default ActiveDirectoryPage;
