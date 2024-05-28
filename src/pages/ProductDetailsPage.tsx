import React, { useEffect, useState } from 'react'
import { Button, CardContent, Grid, ThemeProvider, Typography, CardMedia } from "@mui/material"
import muiTheme from "@/util/muiTheme"
import { Link, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '@/services/toolkit/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsById } from '@/services/toolkit/slices/productSlice'
import { Product } from '@/types'



const ProductDetailsPage = () => {

     const { product, isLoading, error } = useSelector((state: RootState) => state.productR)
    const {productID} = useParams<{productID: string}>()
    const {imgUrl} = useParams<{imgUrl: string}>() 

     const dispatch: AppDispatch = useDispatch()

     useEffect(() => {
        const fetchData = async () => {
          await dispatch(fetchProductsById(productID));
        };
        if (productID) { // Make sure productID is not undefined
          fetchData();
        }
      }, [dispatch, productID]); 

      const productImages = product ? (Array.isArray(product.imgUrl) ? product.imgUrl : [product.imgUrl]) : [];
    


      useEffect(() => {
      }, [productImages]); // Dependency should be productImages

   

    
  return (
    <ThemeProvider theme={muiTheme}>
            <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                marginTop="80px" 
                height="calc(100vh - 80px)"
                spacing={4}
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  padding: "20px"
              }}
            >
                <Grid item xs={12} md={4} style={{ paddingLeft: '20px' }}>

                {productImages.length ? (
                 productImages.map((item, index) => {
                 const imageUrl = item instanceof File ? URL.createObjectURL(item) : item;

                  return (
                  <CardMedia
                 key={index}
                component="img"
                 height="auto"
                  content="center"
                  image={imageUrl}
               
                sx={{ width: '100%', maxWidth: '100%', height: 'auto', mb: 2, borderRadius: 1, mt: 5, marginLeft: 13 }}

                  />
                  );
                   })
                  ) : (       
                  <Typography variant="body2" color="text.secondary">
                    No images available
                  </Typography>
                )}
                    

 
    
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom sx={{margin: "5px"}}>
                    
                    </Typography>
                    {isLoading && <Typography>Loading...</Typography>}
                    {error && <Typography>Error: {error}</Typography>}
                    {product && (
                        <div>
                            <Typography variant="h5" sx={{margin: "10px"}}>{product.productName}</Typography>
                            <Typography variant="body1">Price: ${product.price?.toLocaleString("en-US")}</Typography>
                            <Typography variant="body1" sx={{margin: "5px"}}>{product.description}</Typography>
                            <Button variant="outlined" color="secondary" sx={{margin: "5px"}}>In-Stock</Button>
                            <Typography variant="body2">Item Arrival: {new Date(product.createdAt).toLocaleDateString()}</Typography>
                        </div>
                    )}
                    <CardContent>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ margin: 1 }}
                        >
                            Add To Cart
                        </Button>
                        <Link to={`/cart`} style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary">
                                Buy Now
                            </Button>
                        </Link>
                    </CardContent>
                </Grid>
            </Grid>
        </ThemeProvider>
  )

}

export default ProductDetailsPage