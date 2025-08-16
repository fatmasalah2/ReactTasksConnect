import { useState, useEffect } from "react";
import UsersPagination from "../components/UsersPagination";
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
  MenuItem,
  useTheme,
} from "@mui/material";

import usersData from "../data/usersData.json";
import businessUnitsData from "../data/businessUnitData.json";
import activeDirectoriesData from "../data/activeDirectoryData.json";

interface User {
  [key: string]: any;
}

interface BusinessUnit {
  id: string;
  name: string;
  code: string;
}

interface ActiveDirectory {
  id: string | number;
  name: string;
  description: string;
}

const hiddenKeys = ["createdAt", "modifiedAt", "createdById", "modifiedById"];

const fieldLabels: { [key: string]: string } = {
  id: "ID",
  username: "Username",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phoneNumber: "Phone",
  department: "Department",
  roleCode: "Role",
  businessUnitId: "Business Unit",
  provider: "Provider",
  status: "Status",
  password: "Password",
  activeDirectoryId: "Active Directory",
};

const UsersPage = () => {
  const theme = useTheme();

  // Users state
  const [users, setUsers] = useState<User[]>(usersData);

  // Dropdown states
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>(businessUnitsData);
  const [activeDirectories, setActiveDirectories] = useState<ActiveDirectory[]>(activeDirectoriesData);

  // Modals & edit
  const [expandedUser, setExpandedUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const handlePageChange = (_: any, value: number) => setPage(value);
  const handleShowDetails = (user: User) => setExpandedUser(user);
  const handleCloseDetails = () => setExpandedUser(null);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (user: User) => {
    setEditUser({ ...user });
    setOpenModal(true);
  };

  const handleAdd = () => {
    const newUser: User = {};
    Object.keys(users[0])
      .filter((key) => !hiddenKeys.includes(key))
      .forEach((key) => (newUser[key] = ""));
    newUser.id = Date.now().toString();
    setEditUser(newUser);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (editUser) {
      setUsers((prev) => {
        const exists = prev.find((u) => u.id === editUser.id);
        if (exists) return prev.map((u) => (u.id === editUser.id ? editUser : u));
        return [...prev, editUser];
      });
    }
    setOpenModal(false);
    setEditUser(null);
  };

  // Pagination slice
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  // Helper to get names
  const getBUName = (id: string) => businessUnits.find((bu) => bu.id === id)?.name || "-";
  const getADName = (id: string | number) => activeDirectories.find((ad) => ad.id === id)?.name || "-";

  // Sync dropdowns if underlying JSON changes (optional)
  useEffect(() => {
    setBusinessUnits(businessUnitsData);
    setActiveDirectories(activeDirectoriesData);
  }, []);

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", bgcolor: theme.palette.background.default, color: theme.palette.text.primary, p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
        Users List
      </Typography>

      <Box mb={2}>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ bgcolor: theme.palette.primary.main, color: "#fff", "&:hover": { bgcolor: theme.palette.primary.dark }, textTransform: "none" }}
        >
          + Add New User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.paper }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Username", "Email", "Role", "First Name", "Last Name", "Status", "Department", "Phone", "Business Unit", "Active Directory", "Actions"].map(
                (header) => (
                  <TableCell key={header} sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email || "-"}</TableCell>
                <TableCell>{user.roleCode || "-"}</TableCell>
                <TableCell>{user.firstName || "-"}</TableCell>
                <TableCell>{user.lastName || "-"}</TableCell>
                <TableCell>{user.status || "-"}</TableCell>
                <TableCell>{user.department || "-"}</TableCell>
                <TableCell>{user.phoneNumber || "-"}</TableCell>
                <TableCell>{getBUName(user.businessUnitId)}</TableCell>
                <TableCell>{getADName(user.activeDirectoryId)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => handleShowDetails(user)} sx={{ textTransform: "none" }}>
                      Show Details
                    </Button>
                    <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(user)} sx={{ textTransform: "none" }}>
                      Update
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(user.id)} sx={{ textTransform: "none" }}>
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        <UsersPagination page={page} totalPages={totalPages} onChange={handlePageChange} />
      </Box>

      {/* Show Details Modal */}
      <Dialog open={!!expandedUser} onClose={handleCloseDetails} fullWidth maxWidth="md">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default, maxHeight: "70vh", overflowY: "auto" }}>
          {expandedUser && (
            <Table>
              <TableBody>
                {Object.entries(expandedUser)
                  .filter(([key]) => !hiddenKeys.includes(key))
                  .map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: "bold", color: theme.palette.text.secondary }}>{fieldLabels[key] || key}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>
                        {key === "businessUnitId" ? getBUName(value) : key === "activeDirectoryId" ? getADName(value) : value || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
        <DialogTitle>{editUser?.id && users.some((u) => u.id === editUser.id) ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent dividers sx={{ bgcolor: theme.palette.background.default }}>
          {editUser &&
            Object.keys(editUser)
              .filter((key) => !hiddenKeys.includes(key))
              .map((key) => {
                if (key === "businessUnitId") {
                  return (
                    <TextField
                      key={key}
                      select
                      label="Business Unit"
                      fullWidth
                      margin="dense"
                      value={editUser[key] || ""}
                      onChange={(e) => setEditUser({ ...editUser, [key]: e.target.value })}
                    >
                      {businessUnits.map((bu: BusinessUnit) => (
                        <MenuItem key={bu.id} value={bu.id}>
                          {bu.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }
                if (key === "activeDirectoryId") {
                  return (
                    <TextField
                      key={key}
                      select
                      label="Active Directory"
                      fullWidth
                      margin="dense"
                      value={editUser[key] || ""}
                      onChange={(e) => setEditUser({ ...editUser, [key]: e.target.value })}
                    >
                      {activeDirectories.map((ad: ActiveDirectory) => (
                        <MenuItem key={ad.id} value={ad.id}>
                          {ad.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }
                return (
                  <TextField
                    key={key}
                    label={fieldLabels[key] || key}
                    fullWidth
                    margin="dense"
                    value={editUser[key] || ""}
                    onChange={(e) => setEditUser({ ...editUser, [key]: e.target.value })}
                  />
                );
              })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
