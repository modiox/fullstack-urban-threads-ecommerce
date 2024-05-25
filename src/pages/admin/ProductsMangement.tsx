import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/toolkit/store";
import { Product } from "@/types";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  MenuItem,
  Menu,
  tableCellClasses,
  styled,
  SelectChangeEvent
} from "@mui/material";
import { AdminSidebar } from "@/components/layout/sidebar/AdminSidebar";
import muiTheme from "@/util/muiTheme";
import useProductState from "@/hooks/useProductState";
import { fetchProducts, createProduct, updateProduct, deleteProduct, searchProducts } from "@/services/toolkit/slices/productSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { fetchCategories } from "@/services/toolkit/slices/categorySlice";

// Define the CreateProductFormData type
type CreateProductFormData = {
  productName: string;
  description: string;
  price: number;
  quantity: number;
  categoryID: string
};

const ProductsManagement = () => {
  const { products, isLoading, error, totalPages } = useProductState() as { products: Product[]; isLoading: boolean; error: string; totalPages: number };
  const categories = useSelector((state: RootState) => state.categoryR.categories); 


  const dispatch: AppDispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [keyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("keyword");


  useEffect(() => {
    dispatch(fetchCategories({ pageNumber, pageSize, keyword, sortBy }));
    dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy }));
  }, [dispatch, pageNumber, pageSize, keyword, sortBy]);


  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy }));
  }, [dispatch, pageNumber, pageSize, keyword, sortBy]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isAscending, setAscending] = useState("")

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormData>();

  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      if (isEdit && currentProduct) {
        await dispatch(updateProduct({ ...currentProduct, ...data }));
      } else {
        await dispatch(createProduct(data));
      }
      setIsFormOpen(false);
      setIsEdit(false);
      setCurrentProduct(null);
      reset();
      dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProduct = (product: Product) => {
    setIsFormOpen(true);
    setIsEdit(true);
    setCurrentProduct(product);
    reset(product);
  };

  const handleDeleteProduct = async (productID: string) => {
    try {
      await dispatch(deleteProduct(productID));
      dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy }));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const handleSearchClick = async (e: SelectChangeEvent<string>) => {
    await dispatch(searchProducts({ pageNumber, pageSize, keyword, isAscending, sortBy }))
  
      setAscending("true") 
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

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
          Product Management
        </Typography>
        <AdminSidebar />

        <Button color="warning" size ="large" sx={{ margin: "10px "}}onClick={() => {
          setIsFormOpen(!isFormOpen);
          setIsEdit(false);
          reset();
          setCurrentProduct(null);
        }}>
          {isFormOpen ? "Close" : "Create Product"}
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
                {isEdit ? "Edit Product" : "Create Product"}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="productName"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Product name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Name"
                          fullWidth
                          error={!!errors.productName}
                          helperText={errors.productName ? errors.productName.message : ""}
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

                  <Grid item xs={12}>
                  <Controller
                      name="categoryID"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <TextField
                            select
                            label="Category"
                            {...field}
                          >
                            {categories.map((category) => (
                              <MenuItem key={category.categoryID} value={category.categoryID}>
                                {category.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="price"
                      control={control}
                      defaultValue={0}
                      rules={{ required: "Price is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Price"
                          fullWidth
                          type="number"
                          error={!!errors.price}
                          helperText={errors.price ? errors.price.message : ""}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="quantity"
                      control={control}
                      defaultValue={0}
                      rules={{ required: "Quantity is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Quantity"
                          fullWidth
                          type="number"
                          error={!!errors.quantity}
                          helperText={errors.quantity ? errors.quantity.message : ""}
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {isEdit ? "Save Changes" : "Create Product"}
                </Button>
              </Box>
            </Box>
          </Container>
        )}

        <div style={{ width: "100%", maxWidth: "1200px", padding: "20px", marginTop: "100px" }}>
        <FormControl sx={{ marginBottom: 1, width: "100%" }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  label="Search Products"
                  variant="outlined"
                  type="text"
                  name="search"
                  color="secondary"
                  size="small"
                  value={keyword}
                  onChange={handleSearchChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={handleSearchClick}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </FormControl>

          {isLoading && <CircularProgress />}
          {error && (
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.length > 0 &&
                  products.map((product) => (
                    <StyledTableRow key={product.productID}>
                      <TableCell>{product.productID}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.categoryID && categories.find(category => category.categoryID === product.categoryID)!.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <Button variant="contained" size="small" onClick={() => handleEditProduct(product)}>Edit</Button>
                        <Button variant="contained" color="error" size="small" onClick={() => handleDeleteProduct(product.productID)}>Delete</Button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

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

export default ProductsManagement;
