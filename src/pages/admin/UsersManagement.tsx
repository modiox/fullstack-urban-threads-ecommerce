import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/toolkit/store";
import { Category, CreateCategoryFormData } from "@/types";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { AdminSidebar } from "@/components/layout/sidebar/AdminSidebar";
import useCategoryState from "@/hooks/useCategoryState";
import { createCategory, fetchCategories, updateCategory } from "@/services/toolkit/slices/categorySlice";
import SingleCategory from "@/components/ui/SingleCategory";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import muiTheme from "@/util/muiTheme";
import useUserState from "@/hooks/useUserState";
import { blockUnblockUser, fetchUsers } from "@/services/toolkit/slices/userSlice";

const UsersManagement = () => {
  const { users, isLoading, error, totalPages } = useUserState();

  const dispatch: AppDispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [keyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("keyword");

  useEffect(() => {
    dispatch(fetchUsers({ pageNumber, pageSize, keyword, sortBy }));
  }, [dispatch, pageNumber, pageSize, keyword, sortBy]);

  const [isFormOpen, setIsFormOpen] = useState(false);


  const handleBan = async (userId: string, isBanned: boolean) => {
    console.log(`handleBan called with userId: ${userId} and isBanned: ${isBanned}`);
    try {
      await dispatch(blockUnblockUser({ userId, isBanned }));
    } catch (err) {
      console.error("Failed to block/unblock user", err);
    }
  };


  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1);
  };

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };


  return (
    <ThemeProvider theme={muiTheme}>
      <div
        className="product-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "80vh"
        }}
      >
        <Typography variant="h5" component="div" sx={{ my: 2 }}>
          Users Management
        </Typography>
        <AdminSidebar />


        <div style={{ width: "100%", maxWidth: "1200px", padding: "20px", marginTop: "100px" }}>
          <FormControl sx={{ marginBottom: 1, width: "100%" }}>
            <TextField
              label="Search users"
              variant="outlined"
              type="text"
              name="search"
              color="secondary"
              size="small"
              value={keyword}
              onChange={handleSearchChange}
              fullWidth
            />
          </FormControl>

          {isLoading && <CircularProgress />}
          {error && (
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          )}

          <Grid container spacing={2} justifyContent="center">
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.userId}>
                <Typography> username: {user.username}</Typography>
                <Typography> email: {user.email}</Typography>
                <Typography> address: {user.address}</Typography>
                <Typography> is banned: {user.isBanned ? "Yes" : "No"}</Typography>
                <Typography> is admin: {user.isAdmin ? "Yes" : "No"}</Typography>
                <Button
                    onClick={() => {
                      if (user.userId) {
                        console.log(`Button clicked for userId: ${user.userId}`);
                        handleBan(user.userId, !user.isBanned);
                      } else {
                        console.warn("userId is undefined");
                      }
                    }}
                  >
                    {user.isBanned ? "Unblock User" : "Block User"}
                  </Button>
                </Grid>
              ))}
          </Grid>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => setPageNumber(index + 1)}
                variant={pageNumber === index + 1 ? "contained" : "outlined"}
                color="primary"
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={handleNextPage}
              disabled={pageNumber === totalPages || !totalPages}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UsersManagement;
