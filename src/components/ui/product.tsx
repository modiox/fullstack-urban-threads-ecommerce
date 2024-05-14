// import React, { useEffect, useState } from "react"
// import axios from "axios"

// function ProductList() {
//   const [products, setProducts] = useState([])

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await axios.get("/products")
///////or api.get("")
//         setProducts(response.data)
//       } catch (error) {
//         console.error("Error fetching products:", error)
//       }
//     }
//     fetchProducts()
//   }, [])

//   return (
//     <div>
//       <h1>Products</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.name} - {product.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default ProductList
