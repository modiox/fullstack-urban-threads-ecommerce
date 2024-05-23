import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/toolkit/store";
import { Category, CreateCategoryFormData } from "@/types";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { AdminSidebar } from "@/components/layout/sidebar/AdminSidebar";
import useCategoryState from "@/hooks/useCategoryState";
import { createCategory, fetchCategories } from "@/services/toolkit/slices/categorySlice";
import SingleCategory from "@/components/ui/SingleCategory";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import muiTheme from "@/util/muiTheme";

const CategoriesManagement = () => {
  const { categories, isLoading, error, totalPages } = useCategoryState();

  const dispatch: AppDispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [keyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("keyword");

  useEffect(() => {
    dispatch(fetchCategories({ pageNumber, pageSize, keyword, sortBy }));
  }, [dispatch, pageNumber, pageSize, keyword, sortBy]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCategoryFormData>();

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    try { 
       const res = await dispatch(createCategory(data))
       console.log(res)
      }

      catch (err) {
        console.log(err)
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

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSortBy(value);
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
          Category Management
        </Typography>
        <AdminSidebar />
      

        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? "Close" : "Create Category"}
        </Button>

        {isFormOpen && (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Edit Category
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Category name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Name"
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name ? errors.name.message : ""}
                          autoComplete="given-name"
                          autoFocus
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField {...field} label="Description" fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Container>
        )}

        <div style={{ width: "100%", maxWidth: "1200px", padding: "20px", marginTop: "100px" }}>
          <FormControl sx={{ marginBottom: 1, width: "100%" }}>
            <TextField
              label="Search Categories"
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

          <FormControl sx={{ marginBottom: 2, width: "20%" }}>
            <InputLabel id="sort-by-label">Filter</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              label="Filter"
              value={sortBy}
              onChange={handleSortChange}
              fullWidth
            >
              <MenuItem value="20">Price Low to High</MenuItem>
              <MenuItem value="30">Price High to Low</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2} justifyContent="center">
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.categoryID}>
                  <SingleCategory category={category} />
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

export default CategoriesManagement;
