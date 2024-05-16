import React from "react"
import { Product } from "@/types"


const SingleProduct = (props: { product:Product  }) => {
  const {product} = props; 
  console.log(product)
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <h3>{product.name}</h3>
        <h4> Product name is.. </h4>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  )
}

export default SingleProduct
