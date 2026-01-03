//@ts-nocheck
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../store/Admin/User/Action";

const CustomersTable = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { adminUser } = useSelector((store) => store);
  //@ts-ignore
  const { auth } = useSelector((store) => store);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const currentUserId = auth.user?.id;

  useEffect(() => {
    //@ts-ignore
    dispatch(getUsers());
  }, [adminUser.deletedUser, dispatch]);

  const handleDeleteClick = (userId, userName) => {
    setUserToDelete({ id: userId, name: userName });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      //@ts-ignore
      dispatch(deleteUser(userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const canModifyUser = (user) => {
    // Admin cannot modify their own role or delete themselves
    if (user.id === currentUserId) {
      return false;
    }
    // Admin cannot delete or change role of other admins
    if (user.role === "ROLE_ADMIN") {
      return false;
    }
    return true;
  };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Customers" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Addresses</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminUser.loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : adminUser.users?.length > 0 ? (
                adminUser.users.map((user) => {
                  const canModify = canModifyUser(user);
                  return (
                    <TableRow
                      key={user.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Avatar sx={{ bgcolor: "#9155fd" }}>
                          {user.firstName?.charAt(0).toUpperCase()}
                        </Avatar>
                      </TableCell>
                      <TableCell align="left">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === "ROLE_ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role === "ROLE_ADMIN" ? "Admin" : "User"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        {user.address?.length || 0} address(es)
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleDeleteClick(
                              user.id,
                              `${user.firstName} ${user.lastName}`
                            )
                          }
                          disabled={!canModify}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{userToDelete?.name}"? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomersTable;
