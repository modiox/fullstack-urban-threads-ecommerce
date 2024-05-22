import { Category, Product } from "@/types"

import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { CardContent } from "./card";




const SingleCategory = (props:{ category: Category }) => {
    const { category } = props; 
    console.log('hi from prop:', category);

 
return (
   
      <Card sx={{ maxWidth: 345, m: 2}}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {category.name} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description} 
          </Typography>
        </CardContent>
      </Card>

  )
}

export default SingleCategory
