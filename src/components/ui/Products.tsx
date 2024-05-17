import React, { useEffect, useState } from "react"
import SingleProduct from "./SingleProduct"
import muiTheme from "@/util/muiTheme"
import { ThemeProvider } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/services/toolkit/store"
import { fetchProducts } from "@/services/toolkit/slices/productSlice"
import { Product } from "@/types"
import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material"

import "@/util/App.css"
import ProductSidebar from "../layout/sidebar/ProductSidebar"


 const Products = () => {
   const { products, isLoading, error, totalPages } = useSelector((state: RootState) => state.productR)

   const dispatch: AppDispatch = useDispatch()
   const [pageNumber, setPageNumber] = useState(1) //page number is 1 by default
   const [pageSize, setPageSize] = useState(3) //page size is 5 by default
   const [keyword, setSearchKeyword] = useState(" ")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, keyword}))
    }
    fetchData()
  }, [pageNumber, keyword])

  const handelPreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handelNextPage = () => { 
    setPageNumber(currentPage => currentPage +1)
  }
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setSearchKeyword(e.target.value)
   }
   return (
     <ThemeProvider theme={muiTheme}>
       <div
         className="product-container"
         style={{
           display: "grid",
           justifyContent: "center",
           alignItems: "center",
           height: "80vh"
         }}
       >
         <div>
           <Typography variant="h3" sx={{margin: 8}}>Products</Typography>
           <div>
             <ProductSidebar />
           </div>
           {isLoading && <CircularProgress />} {/* Loading indicator */}
           {error && (
             <Typography variant="body1" color="error">
               Error: {error}
             </Typography>
           )}
           <TextField
             variant="outlined"
             type="text"
             name="search"
             id="outlined-basic"
             placeholder="Search products..."
             color="secondary"
             sx={{ marginLeft: "20px", marginBottom: "60px" }}
             size="small"
             value={keyword}
             onChange={handleSearchChange}
           />
           <Grid
             container
             spacing={{ xs: 2, md: 3 }}
             columns={{ xs: 4, sm: 8, md: 12 }}
             direction="row"
             justifyContent="center"
             alignItems="space-between"
           >
             {products &&
               products.length > 0 &&
               products.map((product: Product) => (
                 <SingleProduct key={product.productId} product={product} />
               ))}
           </Grid>
           <div className="number-btn">
             <Button onClick={handelPreviousPage} disabled={pageNumber == 1}>
               Previous
             </Button>
             {Array.from({ length: totalPages }, (_, index) => (
               <Button
                 key={index}
                 onClick={() => setPageNumber(index + 1)}
                 variant={pageNumber === index + 1 ? "contained" : "outlined"}
               >
                 {index + 1}
               </Button>
             ))}
             <Button onClick={handelNextPage} disabled={pageNumber == totalPages}>
               Next
             </Button>
           </div>
         </div>
       </div>
     </ThemeProvider>
   )
 } 
//  {Array.from({length: totalPages},(_, index) =>(<button key={index}> {index+1} </button>) )}

export default Products


