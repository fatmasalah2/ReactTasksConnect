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
import { getButtonStyles } from "../theme";

interface ActiveDirectory {
  id: number;
  name: string;
  description: string;
}

const ActiveDirectoryPage: React.FC = () => {
  const theme = useTheme();
  const buttonStyles = getButtonStyles(theme.palette.mode);

  // Load from localStorage or fallback to JSON data
  const [directories, setDirectories] = useState<ActiveDirectory[]>(() => {
    try {
      const saved = localStorage.getItem("directories");
      return saved ? JSON.parse(saved) : activeDirectoryData;
    } catch (error) {
      console.error("Error loading directories:", error);
      return activeDirectoryData;
    }
  });

  const [expandedDirectory, setExpandedDirectory] = useState<ActiveDirectory | null>(null);
  const [editDirectory, setEditDirectory] = useState<ActiveDirectory | null>(null);

  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Persist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("directories", JSON.stringify(directories));
    } catch (error) {
      console.error("Error saving directories:", error);
    }
  }, [directories]);

  const handleShowDetails = (dir: ActiveDirectory) => setExpandedDirectory(dir);
  const handleCloseDetails = () => setExpandedDirectory(null);

  const handleEdit = (dir: ActiveDirectory) => {
    console.log("Edit button clicked for directory:", dir);
    setEditDirectory({ ...dir });
  };
  const handleCloseEdit = () => setEditDirectory(null);

  const handleDelete = (id: number) => {
    console.log("Delete button clicked for id:", id);
    if (window.confirm("Are you sure you want to delete this directory?")) {
      setDirectories((prev) => prev.filter((dir) => dir.id !== id));
    }
  };

  const handleSaveEdit = () => {
    if (!editDirectory) return;

    console.log("Saving edit for directory:", editDirectory);

    const trimmedName = editDirectory.name.trim();
    const trimmedDescription = editDirectory.description.trim();

    if (!trimmedName) {
      alert("Name cannot be empty.");
      return;
    }

    setDirectories((prev) => {
      const updated = prev.map((dir) =>
        dir.id === editDirectory.id
          ? { ...editDirectory, name: trimmedName, description: trimmedDescription }
          : dir
      );
      console.log("Updated directories:", updated);
      return updated;
    });
    setEditDirectory(null);
  };

  const handleAddNew = () => {
    setNewName("");
    setNewDescription("");
    setIsNewDialogOpen(true);
  };

  const handleSaveNew = () => {
    const trimmedName = newName.trim();
    const trimmedDescription = newDescription.trim();

    if (!trimmedName) {
      alert("Name cannot be empty.");
      return;
    }

    const newDir: ActiveDirectory = {
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
    };
    setDirectories((prev) => [...prev, newDir]);
    setIsNewDialogOpen(false);
  };

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", bgcolor: theme.palette.background.default, color: theme.palette.text.primary, p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
        Active Directory
      </Typography>

      <Box mb={2}>
        <Button
          variant="contained"
          onClick={handleAddNew}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": { bgcolor: theme.palette.primary.dark },
            textTransform: "none"
          }}
        >
          + Add New Directory
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.paper }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Name", "Description", "Actions"].map((header) => (
                <TableCell key={header} sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
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
                      onClick={() => handleShowDetails(dir)}
                      sx={{ textTransform: "none" }}
                    >
                      Show Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(dir)}
                      sx={{ textTransform: "none" }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(dir.id)}
                      sx={{ textTransform: "none" }}
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

      {/* Show Details Dialog */}
      <Dialog open={!!expandedDirectory} onClose={handleCloseDetails} fullWidth maxWidth="md">
        <DialogTitle>Active Directory Details</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default, maxHeight: "70vh", overflowY: "auto" }}>
          {expandedDirectory && (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.secondary, width: "30%" }}>ID</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{expandedDirectory.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.secondary, width: "30%" }}>Name</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{expandedDirectory.name || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.secondary, width: "30%" }}>Description</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{expandedDirectory.description || "-"}</TableCell>
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
      <Dialog open={!!editDirectory} onClose={handleCloseEdit} fullWidth maxWidth="md">
        <DialogTitle>Update Directory</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          {editDirectory && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Name"
                value={editDirectory.name}
                onChange={(e) =>
                  setEditDirectory({ ...editDirectory, name: e.target.value })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Description"
                value={editDirectory.description}
                onChange={(e) =>
                  setEditDirectory({ ...editDirectory, description: e.target.value })
                }
                fullWidth
                margin="dense"
                multiline
                rows={3}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Dialog */}
      <Dialog open={isNewDialogOpen} onClose={() => setIsNewDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add New Directory</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              fullWidth
              margin="dense"
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveNew} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActiveDirectoryPage;
