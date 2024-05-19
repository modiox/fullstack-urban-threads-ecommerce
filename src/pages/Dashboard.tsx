import React, { useState } from "react"
import { useDispatch } from "react-redux"
// import { addProduct, updateProduct, deleteProduct } from "@/services/api/productService"
import { Box, TextField, Button, Typography } from "@mui/material"
import { ThemeProvider } from "react-admin"
import muiTheme from "@/util/muiTheme"

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch()
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [productID, setProductID] = useState("")

  // const handleAddProduct = async () => {
  //   await addProduct({ productName, description, price })
  //   // dispatch fetch products action to refresh the list
  // }

  // const handleUpdateProduct = async () => {
  //   await updateProduct(productId, { productName, description, price })
  //   // dispatch fetch products action to refresh the list
  // }

  // const handleDeleteProduct = async () => {
  //   await deleteProduct(productId)
  //   // dispatch fetch products action to refresh the list
  // } will figure out how to use properly later 


  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ padding: "90px", alignContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
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
