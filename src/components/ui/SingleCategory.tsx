import { Category } from "@/types";
import { Box, Button, Card, Typography } from "@mui/material";
import { CardContent } from "./card";
import { AppDispatch } from "@/services/toolkit/store";
import { useDispatch } from "react-redux";
import { deleteCategory } from "@/services/toolkit/slices/categorySlice";

const SingleCategory = (props: { category: Category; onEdit: (category: Category) => void }) => {
  const { category, onEdit } = props;
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteCat = async (id: string) => {
    try {
      await dispatch(deleteCategory(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category.description}
        </Typography>
        <Button onClick={() => onEdit(category)}>Edit</Button>
        <Button onClick={() => handleDeleteCat(category.categoryID)} color="error">Delete</Button>
      </CardContent>
    </Card>
  );
};

export default SingleCategory;
