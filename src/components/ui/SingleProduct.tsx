import { Product } from "@/types"
import { Link } from "react-router-dom";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CardContent } from "./card";
import { Storage } from "aws-amplify";


const SingleProduct = (props: { product:Product  }) => {
  const {product} = props; 
  const [showFullDescription, setShowFullDescription] = useState(false)
    const [imageUrls, setImageUrls] = useState<string[]>([])

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        if (product.image && product.image.length > 0) {
           const urls = await Promise.all(product.image.map((image: string) => Storage.get(image)))
          setImageUrls(urls)
        }
      } catch (error) {
        console.error("Error fetching image from S3:", error)
      }
    }

    fetchImageUrl()
  }, [product.image])

  

   const toggleDescription = () => {
     setShowFullDescription(!showFullDescription)
   }

   const getDescription = () => {
     if (showFullDescription) {
       return (
         <>
           {product.description}
           <span onClick={toggleDescription} style={{ color: "blue", cursor: "pointer" }}>
             See Less
           </span>
         </>
       )
     } else {
       return (
         <>
           {product.description.length > 100
             ? product.description.substring(0, 100) + "..."
             : product.description}
           {product.description.length > 100 && (
             <span onClick={toggleDescription} style={{ color: "blue", cursor: "pointer" }}>
               See More
             </span>
           )}
         </>
       )
     }
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
            color="secondary"
            sx={{ margin: "30px", marginRight: "10px", marginLeft: "10px" }}
            size="small"
          >
            Add To Cart
          </Button>
          <Link to={`/products/${product.productID}`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary" size="small">
              Show Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}

export default SingleProduct
