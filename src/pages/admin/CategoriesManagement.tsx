import React, { useEffect, useState } from "react";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/toolkit/store";
import { Category } from "@/types";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import "@/util/App.css";
import { AdminSidebar } from "@/components/layout/sidebar/AdminSidebar";
import useCategoryState from "@/hooks/useCategoryState";
import { fetchCategories } from "@/services/toolkit/slices/categorySlice";
import SingleCategory from "@/components/ui/SingleCategory";

const CategoriesManagement = () => {
  const { categories, isLoading, error, totalPages } = useCategoryState();

  const dispatch: AppDispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [keyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("keyword");
  const [isAscending, setAscending] = useState("");

  useEffect(() => {
    dispatch(fetchCategories({ pageNumber, pageSize, keyword, sortBy }));
  }, [dispatch, pageNumber, pageSize, keyword, sortBy, isAscending]);

  // const handleSearchAndFilter = async () => {
  //   await dispatch(searchProducts({ pageNumber, pageSize, keyword, isAscending, sortBy }));
  //   await dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy }));
  // };

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
  
    if (value === "20") {
      setAscending("true");
    } else if (value === "30") {
      setAscending("false");
    } else {
      setAscending(""); // Default to empty string if not provided
    }
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
        <AdminSidebar />
        <Typography variant="h4" component="div" sx={{ my: 2 }}>
          Category Management
        </Typography>
        <div style={{ width: "100%", maxWidth: "1200px", padding: "20px", marginTop: "100px" }}>
          <FormControl sx={{ marginBottom: 2, width: "100%" }}>
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
              {/* Filtering products by price */}
              <MenuItem value="20">Price Low to High</MenuItem>
              <MenuItem value="30">Price High to Low</MenuItem>
            </Select>
          </FormControl>
          {/* <Button onClick={handleSearchAndFilter}>Search</Button> */}

          <Grid container spacing={2} justifyContent="center">
              {categories &&
               categories.length > 0 &&
                categories.map((category) => (
           <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
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
              disabled={pageNumber === totalPages}
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
