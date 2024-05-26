import SingleProduct from '@/components/ui/SingleProduct';
import React from 'react'
import { useParams } from 'react-router-dom';

const CategoryPage = () => {

    const { categoryID } = useParams();
  return (
    <div>
      <h1>Category {categoryID}</h1>
      <SingleProduct categoryID={categoryID} />
    </div>
  )
}

export default CategoryPage

