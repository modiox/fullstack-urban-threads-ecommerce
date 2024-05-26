import { Product } from "@/types"
import { Link } from "react-router-dom";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardContent } from "./card";
import { Storage } from "aws-amplify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/toolkit/store";
import { addToCart } from "@/services/toolkit/slices/cartSlice";


interface Props {
  product: Product;
  categoryID: string; 
}

const SingleProduct: React.FC<Props> = ({ product, categoryID }) =>{
 // const {product} = props; 
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     try {
  //       if (product.image && product.image.length > 0) {
  //          const urls = await Promise.all(product.image.map((image: string) => Storage.get(image)))
  //         setImageUrls(urls)
  //       }
  //     } catch (error) {
  //       console.error("Error fetching image from S3:", error)
  //     }
  //   }

  //   fetchImageUrl()
  // }, [product.image])

  const dispatch:AppDispatch = useDispatch()
  
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))

  }
 
 
  return (
    <ThemeProvider theme={muiTheme}>
      <Card sx={{ maxWidth: 345, m: 2 }}>
        <Box>
          {imageUrls.map((url, index) => (
            <CardMedia
              key={index}
              component="img"
              height="150"
              image={url} // Use the fetched S3 image URL
              alt={`${product.productName} image ${index + 1}`}
              sx={{ mb: 1 }} //
            />
          ))}
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price?.toLocaleString("en-US")}
          </Typography>
        </CardContent>
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "30px", marginRight: "10px", marginLeft: "10px", color: "secondary.light" }}
            size="small" onClick={() => {handleAddToCart(product)}}
          >
            Add To Cart
          </Button>
          <Link to={`/products/${product.productID}`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="small" sx ={{color: "secondary.light"}}>
              Show Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}

export default SingleProduct
