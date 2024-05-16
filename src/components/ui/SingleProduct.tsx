import React from "react"
import { Product } from "@/types"


const SingleProduct = (props: { product:Product  }) => {
  const {product} = props; 
  console.log(product)
  return (
    <div className="product-card">
      <img src={product.image} alt={product.productName} />
      <div className="product-details">
        <h3>{product.productName}</h3>
        <h4> Product: {product.productName} </h4>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  )
}

export default SingleProduct
