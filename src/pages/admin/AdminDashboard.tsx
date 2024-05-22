import React, { useState } from "react"
import { useDispatch } from "react-redux"
// import { addProduct, updateProduct, deleteProduct } from "@/services/api/productService"
import { Box, TextField, Button, Typography } from "@mui/material"
import { Link, ThemeProvider } from "react-admin"
import muiTheme from "@/util/muiTheme"
import { AdminSidebar } from "@/components/layout/sidebar/AdminSidebar"

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch()
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [productID, setProductID] = useState("")

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ padding: "100px", alignContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to your dashboard, Admin! 
        </Typography>
        <AdminSidebar/>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "23px", maxWidth: "400px" }}
        >
          <TextField
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <TextField
            label="Product ID (for update/delete)"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
          />
          <Button variant="contained">Add Product</Button>
          <Button variant="contained">
            Update Product {/* will add onClick Buttons later :)  */}
          </Button>
          <Button variant="contained" color="error">
            Delete Product
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default DashboardPage
