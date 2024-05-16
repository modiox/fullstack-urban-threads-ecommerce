import React, { useEffect, useState } from "react"
import api from "@/api"
import SingleProduct from "./SingleProduct"
import muiTheme from "@/util/muiTheme"
import { ThemeProvider } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/services/toolkit/store"
import { fetchProducts } from "@/services/toolkit/slices/productSlice"
import { Product } from "@/types"
import { Typography } from "@mui/material"



 const Products = () => {
   const { products, isLoading, error } = useSelector((state: RootState) => state.productR)

   const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts())
    }
    fetchData()
  }, [])

   return (
     <ThemeProvider theme={muiTheme}>
       <div
         style={{
           display: "grid",
           justifyContent: "center",
           alignItems: "center",
           height: "70vh"
         }}>
         <div>
           <h1>Products</h1>
           {isLoading && <p> Loading.. </p>}
           {error && <p> Error..{error} </p>}
           {products &&
             products.length > 0 &&
             products.map((product: Product) => (
               <SingleProduct key={product.productId} product={product} />
             ))}
         </div>
       </div>
     </ThemeProvider>
   )
 }

export default Products
