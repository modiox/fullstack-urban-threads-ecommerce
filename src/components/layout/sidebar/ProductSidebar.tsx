import React from 'react'
import "@/util/App.css"
import { Button } from '@mui/material'

const ProductSidebar = () => {
  return (
    <div>
      <div>
        <Button className="cat-filter-button"> Filter by category </Button>
      </div>
      <div>
        <Button className="price-filter-button"> Filter by price</Button>
      </div>
    </div>
  )
}

export default ProductSidebar