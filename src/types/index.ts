import { ReactNode } from "react"

export type Product = {
  price: ReactNode
  productId: string
  name: string
  image: string
  quantity: number
  categories: Category[]

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

