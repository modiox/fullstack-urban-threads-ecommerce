import { Product } from "@/types"
import { Link } from "react-router-dom";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardActionArea, CardActions, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardContent } from "./card";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/toolkit/store";
import { addToCart } from "@/services/toolkit/slices/cartSlice";
import { uploadImageToCloudinary } from "@/util/cloudinary"


interface Props {
  product: Product;
  categoryID: string; 
}

const SingleProduct: React.FC<Props> = ({ product, categoryID }) =>{
 // const {product} = props; 

  

  const dispatch:AppDispatch = useDispatch()
  
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))

  }
 
 
  return (
    <ThemeProvider theme={muiTheme}>
      <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              {product.image?.map((url, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  height="200"
                  image={url}
                  alt={`${product.productName} image ${index + 1}`}
                  sx={{ mb: 1 }}
                />
              ))}
            </Card>
          </Grid>
        </Grid>
        <Card> 
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price?.toLocaleString("en-US")}
          </Typography>
        </CardContent>
        <CardActionArea>
          <CardActions> 
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "40px", marginRight: "25px", marginLeft: "25px", color: "secondary" }}
            size="small" onClick={() => {handleAddToCart(product)}}
          >
            Add To Cart
          </Button>
          <Link to={`/products/${product.productID}`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="small" sx ={{color: "secondary"}}>
              Show Details
            </Button>
          </Link>

          </CardActions>
          
        </CardActionArea>
      </Card>

      </Container> 
        
    </ThemeProvider>
  )
}

export default SingleProduct
