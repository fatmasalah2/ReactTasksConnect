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
import { getButtonStyles } from "../theme";

interface BusinessUnit {
    id: string;
    name: string;
    code: string;
}

const BusinessUnitPage: React.FC = () => {
    const theme = useTheme();
    const buttonStyles = getButtonStyles(theme.palette.mode);

    // Load localStorage & JSON, remove duplicates, ensure proper ID handling
    const [units, setUnits] = useState<BusinessUnit[]>(() => {
        try {
            const saved = localStorage.getItem("businessUnits");

            // If we have saved data in localStorage, use it (this preserves deletions)
            if (saved) {
                const savedUnits: BusinessUnit[] = JSON.parse(saved);
                return savedUnits.map(u => ({
                    id: String(u.id),
                    name: String(u.name).trim(),
                    code: String(u.code).trim(),
                }));
            }

            // Only use JSON data as initial data if localStorage is empty
            return businessUnitData.map(u => ({
                id: String(u.id),
                name: String(u.name).trim(),
                code: String(u.code).trim(),
            }));
        } catch (error) {
            console.error("Error loading business units:", error);
            return businessUnitData.map(u => ({
                id: String(u.id),
                name: String(u.name).trim(),
                code: String(u.code).trim(),
            }));
        }
    });

    const [expandedUnit, setExpandedUnit] = useState<BusinessUnit | null>(null);
    const [editUnit, setEditUnit] = useState<BusinessUnit | null>(null);
    const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newCode, setNewCode] = useState("");

    // Persist changes to localStorage
    useEffect(() => {
        try {
            localStorage.setItem("businessUnits", JSON.stringify(units));
        } catch (error) {
            console.error("Error saving business units:", error);
        }
    }, [units]);

    const handleShowDetails = (unit: BusinessUnit) => setExpandedUnit(unit);
    const handleCloseDetails = () => setExpandedUnit(null);

    const handleEdit = (unit: BusinessUnit) => {
        console.log("Edit button clicked for unit:", unit);
        setEditUnit({ ...unit });
    };
    const handleCloseEdit = () => setEditUnit(null);

    const handleDelete = (id: string) => {
        console.log("Delete button clicked for id:", id);
        if (window.confirm("Are you sure you want to delete this business unit?")) {
            setUnits((prev) => prev.filter((u) => u.id !== id));
        }
    };

    const handleSaveEdit = () => {
        if (!editUnit) return;

        console.log("Saving edit for unit:", editUnit);

        const trimmedName = editUnit.name.trim();
        const trimmedCode = editUnit.code.trim();

        if (!trimmedName) {
            alert("Name cannot be empty.");
            return;
        }

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

        setUnits((prev) => {
            const updated = prev.map((u) =>
                u.id === editUnit.id
                    ? { ...editUnit, name: trimmedName, code: trimmedCode }
                    : u
            );
            console.log("Updated units:", updated);
            return updated;
        });
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
        if (!trimmedName) {
            alert("Name cannot be empty.");
            return;
        }

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
            id: `bu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: trimmedName,
            code: trimmedCode,
        };

        setUnits((prev) => [...prev, newUnit]);
        setIsNewDialogOpen(false);
    };

    return (
        <Box sx={{ width: "100vw", minHeight: "100vh", bgcolor: theme.palette.background.default, color: theme.palette.text.primary, p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
                Business Units
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
                    + Add New Business Unit
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.paper }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {["Name", "Code", "Actions"].map((header) => (
                                <TableCell key={header} sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
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
                                            onClick={() => handleShowDetails(unit)}
                                            sx={{ textTransform: "none" }}
                                        >
                                            Show Details
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleEdit(unit)}
                                            sx={{ textTransform: "none" }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(unit.id)}
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
            <Dialog open={!!expandedUnit} onClose={handleCloseDetails} fullWidth maxWidth="md">
                <DialogTitle>Business Unit Details</DialogTitle>
                <DialogContent dividers sx={{ bgcolor: theme.palette.background.default, maxHeight: "70vh", overflowY: "auto" }}>
                    {expandedUnit && (
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.secondary, width: "30%" }}>ID</TableCell>
                                    <TableCell sx={{ color: theme.palette.text.primary }}>{expandedUnit.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.secondary, width: "30%" }}>Name</TableCell>
                                    <TableCell sx={{ color: theme.palette.text.primary }}>{expandedUnit.name || "-"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.secondary, width: "30%" }}>Code</TableCell>
                                    <TableCell sx={{ color: theme.palette.text.primary }}>{expandedUnit.code || "-"}</TableCell>
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
            <Dialog open={!!editUnit} onClose={handleCloseEdit} fullWidth maxWidth="md">
                <DialogTitle>Update Business Unit</DialogTitle>
                <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
                    {editUnit && (
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <TextField
                                label="Name"
                                value={editUnit.name}
                                onChange={(e) => setEditUnit({ ...editUnit, name: e.target.value })}
                                fullWidth
                                margin="dense"
                            />
                            <TextField
                                label="Code"
                                value={editUnit.code}
                                onChange={(e) => setEditUnit({ ...editUnit, code: e.target.value })}
                                fullWidth
                                margin="dense"
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
                <DialogTitle>Add New Business Unit</DialogTitle>
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
                            label="Code"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                            fullWidth
                            margin="dense"
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

export default BusinessUnitPage;
