// import React, { useEffect, useState } from "react"
//import axios from "axios"
// import { Product } from "../types"
import Index from "../routes"
// import api from "../api"
import "./App.css"
// import { Button } from "../components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "../components/ui/card"


const App = () => { 
  return (
    <div>
      <Index/>
      <h1> Welcome... </h1>
    </div>
  )
}
  

export default App

// <Card>
//   <CardHeader>
//     <CardTitle>Product Name</CardTitle>
//   </CardHeader>
//   <CardContent>
//     <CardDescription>Description of the product...</CardDescription>
//     <p>Price: $X.XX</p>
//     {/* Additional product details */}
//   </CardContent>
//   <CardFooter>
//     {/* Add to cart button or other actions */}
//   </CardFooter>
// </Card>

// // Queries
// const { data, error } = useQuery<Product[]>({
//   queryKey: ["products"],
//   queryFn: getProducts
// })

{
  /* <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
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
      {error && <p className="text-red-500">{error.message}</p>} */
}

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
// <div className="app">
    //   <h1 className="text-2xl uppercase mb-10">Products</h1>

    //   {loading ? (
    //     <p className="text-3xl mb-10">Printing the products should go here ...</p>
    //   ) : error ? (
    //     <p>{error}</p>
    //   ) : (
    //     <ul>
    //       {products &&
    //         products.map((product) => (
    //           <li key={product.id}>
    //             {product.name} - {product.price}
    //           </li>
    //         ))}
    //       <Button variant="default" size="default" onClick={() => console.log("Button clicked")}>
    //         Click me
    //       </Button>
    //     </ul>
    //   )}

    // </div>