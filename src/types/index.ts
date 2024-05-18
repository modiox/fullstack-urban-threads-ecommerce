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

export type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  image?: string
  address: string
  isAdmin?: boolean
  isBanned?: boolean
  createdAt?: string
}
export type UserState = {
  // user: User | null
 // totalPages: number
  error: null | string
  isLoading: boolean
}