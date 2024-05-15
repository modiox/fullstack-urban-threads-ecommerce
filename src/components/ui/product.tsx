import React, { useEffect, useState } from "react"
import api from "@/api"
import { Product } from "@/types"

function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products")
        setProducts(res.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError("Something went wrong. Please try again later.")
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
