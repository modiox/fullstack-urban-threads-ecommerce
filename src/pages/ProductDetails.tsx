import React, { useEffect } from 'react'
import { ThemeProvider } from "@mui/material"
import muiTheme from "@/util/muiTheme"
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '@/services/toolkit/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsById } from '@/services/toolkit/slices/productSlice'

const ProductDetails = () => {

     const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

     const dispatch: AppDispatch = useDispatch()

     useEffect(() => {
       const fetchData = async () => {
         await dispatch(fetchProductsById(productId))
       }
       fetchData()
     }, [])

    const {productId} = useParams<{productId: string}>()
    console.log(productId) //it console logs the product name !? 
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
              <img src={product.image} alt={product.productName}></img>
              <div className="product-body">
                <h3> {product.productName}</h3>
                <p> {product.image}</p>
                <p> Price: {product.price}</p>
                <p> Quanitity: {product.quantity}</p>
                <p> Book Arrival: {new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </article>
      </div>
    </ThemeProvider>
  )

}

export default ProductDetails