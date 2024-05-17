// import React, { useEffect, useState } from "react"
// import { Container, Typography, List, ListItem } from "@mui/material"
// import axios from "axios"
// import { Category } from "@/types"
// import { useDispatch, useSelector } from "react-redux"
// import { AppDispatch } from "@/services/toolkit/store"

//  const Categories = () => {
//    const { categories, isLoading, error } = useSelector((state: RootState) => state.categoryR)

//    const dispatch: AppDispatch = useDispatch()
//    useEffect(() => {
//      axios
//        .get("http://your-api-url/categories")
//        .then((response) => {
//          categories(response.data)
//        })
//        .catch((error) => {
//          console.error("There was an error fetching the categories!", error)
//        })
//    }, [])

//    return (
//      <Container>
//        <Typography variant="h4">Categories</Typography>
//        <List>
//          {categories.map((category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => (
//            <ListItem key={category.categoryId}>
//              {category.categoryName} category={category}
//            </ListItem>
//          ))}
//        </List>
//      </Container>
//    )
//  }

// export default Categories
