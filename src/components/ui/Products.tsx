import React, { useEffect, useState } from "react"
import api from "@/api"
import { Product } from "@/types"
import SingleProduct from "./SingleProduct"
import muiTheme from "@/util/muiTheme"
import { ThemeProvider } from "@emotion/react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/services/toolkit/store"
import { fetchProducts } from "@/services/toolkit/slices/productSlice"



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
       <div>
         <h1>Products</h1>
         {isLoading && <p> Loading.. </p>}
         {error && <p> Error..{error} </p>}
         {products &&
           products.length > 0 &&
           products.map((product) => <SingleProduct key={product.productId} product={product} />)}
       </div>
     </ThemeProvider>
   )
 }

export default Products
