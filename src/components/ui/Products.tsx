import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import muiTheme from "@/util/muiTheme"
import { ThemeProvider } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/services/toolkit/store"
import { fetchProducts } from "@/services/toolkit/slices/productSlice"
import { Product } from "@/types"
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
} from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import "@/util/App.css"

const Products = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )

  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [keyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("Name")


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, keyword, sortBy }))
    }
    fetchData()
  }, [dispatch, pageNumber, pageSize, keyword, sortBy])

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSortBy(e.target.value)
  }

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
        <div style={{ width: "100%", maxWidth: "1200px", padding: "20px" }}>
          <FormControl sx={{ marginBottom: 2, width: "100%" }}>
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
          </FormControl>

          {isLoading && <CircularProgress />}
          {error && (
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          )}

          <FormControl sx={{ marginBottom: 2, width: "100%" }}>
            <InputLabel id="sort-by-label">Filter</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              label="Filter"
              value={sortBy}
              onChange={handleSortChange}
              fullWidth
            >
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="Price">Price</MenuItem>
              <MenuItem value="Ascending">Ascending</MenuItem>
              <MenuItem value="Descending">Descending</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12  }} justifyContent="center">
            {products &&
              products.length > 0 &&
              products.map((product: Product) => (
                <Grid item xs={12} sm={6} md={4} key={product.productId}>
                  <SingleProduct product={product} />
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
  )
}

export default Products
