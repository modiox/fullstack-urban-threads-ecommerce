
import React, { useEffect, useState } from "react"
//import axios from "axios"

import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./components/ui/card"
import { Product } from "./types"
import api from "./api"

import "./App.css"



function App() {
  // const [products, setProducts] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      setProducts(res.data)
      console.log(res.data)
      //setLoading(false)
    } catch (error) {
      console.error(error)
      setError("Something went wrong. Please try again later.")
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="app">
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      {loading ? (
        <p>Printing the products should go here ...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {products && products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  )
}


export default App






  // // Queries
  // const { data, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getProducts
  // })

 {/* <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content Here</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>} */}


//       // function App() {

// interface Product {
//   id: number
//   name: string
//   price: number
//   // Add other properties as needed
// }  
//   const [products, setProducts] = useState<Product[]>([])
//   const getProducts = async () => {
//     try {
//       console.log("Running Hello??.. :)")
//       const res = await api.get("/products")
//       setProducts(res.data) // Set the products in state
//       return res.data
//     } catch (error) {
//       console.error(error)
//       return Promise.reject(new Error("Something went wrong"))
//     }
//   }
//   useEffect(() => {
//     getProducts()
//   }, [])


//   return (
//     <div className="app">
//       <h1 className="text-2xl uppercase mb-10"> Products</h1>
//       <h1> Welcome to E-Commerce App </h1>
//       <ul>
//         {products &&
//           products.map((product) => (
//             <li key={product.id}>
//               {product.name} - {product.price}
//             </li>
//           ))}
//       </ul>
//     </div>
//   )
// } 