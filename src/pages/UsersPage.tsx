import React, { useState } from "react";
import usersData from "../data/usersData.json";
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
    Collapse,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

interface User {
    [key: string]: any;
    // interface user
    // has key of type string
    // and value may be of any type
    // be3tbar eni msh 3rfa el data li gyali eh
    // we 3mtn interface 34n ana m3rfsh wla lkeys
    // wla lva;ues li gayali
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>(usersData);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    // de states bt3ty
    // users -> array of objects feh kul ldata bt3t lusers li 3ndi
    // expandedrow -> men lsaf aw mn lakhr luser li ana fat7a ldetails bt3tu dlw2ty
    // openmodal-> de lpopup menu li btzhr lw h3dl haga aw hadef user hal maftu7 wla m2ful
    // edituser -> de byanat luser li shaghalen 3leh gwa lmodal 

    const handleToggle = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
        // ana hena b3ml handle lltbdel ben 
        // showmore we showless
        // wlhay lw expandedrow hwa hwa el id bta3 lrow li ana w2fa 3leh
        // ybaa khlas null kda we e2flu we ezhrli showless
        // lw la ybaa gddli el id b value lrow li w2fa 3leh
        // we ezhrli ldetails bt3t luser d 
    };
    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers((prev) => prev.filter((user) => user.id !== id));
            // mn el akhr e3mli update llusers ladema li 3ndi
            // khaleha lusers bs mn gher luser li lid bta3u ana 3yza ams7u
        }
    };
    const handleEdit = (user: User) => {
        // de func btshtghl lma adus 3la update button
        // bt3ml copy lluser li e5trtu
        // we btft7li lmodal 34n a3dl bra7ty
        setEditUser({ ...user });
        setOpenModal(true);
    };
    const handleAdd = () => {
        // de btshtghl lma adus add new user button
        const newUser: User = {};
        // b3ml newuser of type user
        // we bybaa object fady 34n ana amla ldata bt3tu
        Object.keys(users[0]).forEach((key) => {
            newUser[key] = "";
            // bdmn en luser lgded
            // hybaa 3ndu kul lkeys li 3nd ay user
            // bs fadya 34n amlaha ana
        });
        newUser.id = Date.now().toString();
        // bdelu id mumyz ybaa khas bl user d 
        // we b7wlu string 34n 3ndi fy ldata lid string
        setEditUser(newUser);
        // hena 5zna byanat lmust5dm lgded fy state esmha edituser li heya kulha fadya dlw2ty
        setOpenModal(true);
        // bft7 lmodal baa 34n abd2 aktb ldetails bt3t lnew user
    };
    const handleSave = () => {
        // btshtghl lma adus save button fy lmodal 
        if (editUser) {
            // bt2kd en feh value hena 
            // mn lakhr ft7en lmodal luser
            // swa2 kn adem we h3mlu edit fy haga
            // aw gded we lsa badefu
            setUsers((prev) => {
                const exists = prev.find((u) => u.id === editUser.id);
                if (exists) {
                    // bndwr 3la lid li hena mskenu dlw2ty 
                    // lw l2ena wahed ybaa ehna fy position t3del
                    // lw la ybaa add new user
                    return prev.map((u) => (u.id === editUser.id ? editUser : u));
                } else {
                    // lw ml2enash bnrg3 lusers ladema
                    // we zyada 3lehum el edituser
                    return [...prev, editUser];
                }
            });
        }
        setOpenModal(false);
        // bn2fl lmodal b3d ma 3mlna save
        setEditUser(null);
    };
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#f5f5f5",
                p: 2,
            }}
        >
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: "#1976d2" }}>
                Users List
            </Typography>

            <Box mb={2}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#115293" },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                    }}
                    onClick={handleAdd}
                >
                    + Add New User
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ flex: 1, overflowY: "auto", width: "100%", maxWidth: "100vw", pb: 6 }}>
                <Table stickyHeader sx={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Username</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Role</strong></TableCell>
                            <TableCell><strong>First Name</strong></TableCell>
                            <TableCell><strong>Last Name</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Department</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <React.Fragment key={user.id}>
                                <TableRow>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email || "-"}</TableCell>
                                    <TableCell>{user.roleCode || "-"}</TableCell>
                                    <TableCell>{user.firstName || "-"}</TableCell>
                                    <TableCell>{user.lastName || "-"}</TableCell>
                                    <TableCell>{user.status || "-"}</TableCell>
                                    <TableCell>{user.department || "-"}</TableCell>
                                    <TableCell>{user.phoneNumber || "-"}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleToggle(user.id)}
                                            >
                                                {expandedRow === user.id ? "Show less" : "Show more"}
                                            </Button>
                                            <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(user)}>
                                                Update
                                            </Button>
                                            <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(user.id)}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={9} sx={{ p: 0, backgroundColor: "#fafafa" }}>
                                        <Collapse in={expandedRow === user.id} timeout="auto" unmountOnExit>
                                            <Box sx={{ p: 2 }}>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    Additional Details
                                                </Typography>
                                                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                                                    {JSON.stringify(user, null, 2)}
                                                </pre>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                        <TableRow>
                            <TableCell colSpan={9} sx={{ height: 50, backgroundColor: "#f5f5f5" }} />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Editing All Fields */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
                <DialogTitle>{editUser?.id && users.some(u => u.id === editUser.id) ? "Edit User" : "Add User"}</DialogTitle>
                <DialogContent dividers>
                    {editUser &&
                        Object.keys(editUser).map((key) => (
                            <TextField
                                key={key}
                                label={key}
                                fullWidth
                                margin="dense"
                                value={editUser[key] || ""}
                                onChange={(e) => setEditUser({ ...editUser, [key]: e.target.value })}
                            />
                        ))}
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
