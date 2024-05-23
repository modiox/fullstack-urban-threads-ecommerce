import { Category, Product } from "@/types"

import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react";
import { Box, Button, Card, CardMedia, ListItem, Typography } from "@mui/material";
import { CardContent } from "./card";
import { AppDispatch } from "@/services/toolkit/store";
import { useDispatch } from "react-redux";
import { deleteCategory } from "@/services/toolkit/slices/categorySlice";



const SingleCategory = (props:{ category: Category }) => {
    const { category } = props; 

    const dispatch:AppDispatch = useDispatch()

    const handleDeleteCat = async (id: string) => {
         dispatch(deleteCategory(id))
         try { 

        const response = await dispatch(deleteCategory(id))
    }
    catch(err){ 
        console.log(err)}
    }
      
    const handleEditCat = async (id: string) => {
        dispatch(deleteCategory(id))
        try { 

       const response = await dispatch(deleteCategory(id))
   }
   catch(err){ 
       console.log(err)}
   }

 
return (

      <Card sx={{ maxWidth: 345, m: 2}}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {category.name} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description} 
          </Typography>
          <Button onClick= {() => {handleEditCat(category.categoryID)}}> Edit </Button>
          <Button onClick= {() => {handleDeleteCat(category.categoryID)}}>  Delete</Button>
        </CardContent>
      </Card>

  )
}

export default SingleCategory
