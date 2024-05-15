import React from "react"
import { Product } from "@/types"

type SingleProductProps = {
  product: Product
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  )
}

export default SingleProduct
