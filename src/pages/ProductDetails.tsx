import React, { useEffect, useState } from 'react'
import { Button, CardContent, ThemeProvider } from "@mui/material"
import muiTheme from "@/util/muiTheme"
import { Link, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '@/services/toolkit/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsById } from '@/services/toolkit/slices/productSlice'
import { Storage } from "aws-amplify"
import { Product } from '@/types'




const ProductDetails = () => {

     const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

     const dispatch: AppDispatch = useDispatch()

     useEffect(() => {
       const fetchData = async () => {
         await dispatch(fetchProductsById(productID))
       }
       fetchData()
     }, [])


    const {productID} = useParams<{productID: string}>()
    console.log(productID) 
    
  return (
    <ThemeProvider theme={muiTheme}>
      <div
        style={{
          display: "grid",
          justifyContent: "space-around",
          alignItems: "center",
          height: "70vh"
        }}
      >
        <article className="product-detail">
          <h1>Product Detail</h1>
          {isLoading && <p> Loading.. </p>}
          {error && <p> Error..{error} </p>}
          {product && (
            <div>
             
              <div className="product-body">
                <h3> {product.productName}</h3>
              
                <p>Price: ${product.price?.toLocaleString("en-US")}</p>
                <p> {product.description}</p>
                <Button> In-Stock</Button>
                <p> Item Arrival: {new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
              <CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ margin: "30px", marginRight: "10px", marginLeft: "10px" }}
                  size="small"
                >
                  Add To Cart
                </Button>
                <Link to={`/cart`} style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="secondary" size="small">
                    Buy Now
                  </Button>
                </Link>
              </CardContent>
            </div>
          )}
        </article>
      </div>
    </ThemeProvider>
  )

}

export default ProductDetails