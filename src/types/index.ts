import { ReactNode } from "react"

export type Product = {
  price: ReactNode
  productId: string
  productName: string
  image: string
  description: string
  quantity: number
  categories: Category[]
  createdAt: string
}

export type Category = { 
  categoryId: string
  categoryName: string
  description: string
  products: Product[]
  sold: number
  shipping: number
  createdAt: string

}

export type ProductState = {
  products: []
  totalPages: number 
  product: Product | null
  error: null | string
  isLoading: boolean
}

// export type Products = {
//   price: ReactNode
//   productId: string
//   productName: string
//   image: string
//   description: string
//   quantity: number
//   categories: Category[]
//   createdAt: string
// }
