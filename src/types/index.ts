import { ReactNode } from "react"

export type Product = {
  price: number
  productID: string
  productName: string
  image: []
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
  userId?: string
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  image?: string
  address: string
  isAdmin?: boolean
  isBanned?: boolean
  createdAt?: string
}
export type UserState = {
  user: User | null
  totalPages: number
  error: null | string
  isLoading: boolean
  // userData: string | null
  isLoggedIn: boolean 
  token: null | string
  
}
export type LoginFormData = {
  email: string
  password: string
  allowExtraEmails: boolean
}

export type LoginData = {
  isLoggedIn: boolean
  userData: User | null // Adjust 'any' to the appropriate type if possible
  token: string | null
}
export type RegisterFormData = { 
  firstName: string 
  lastName: string
  username: string
  email: string 
  password: string 
  //image: FileList
  phone: string 
  address: string
}

//user info update form 
export type UpdateUserProfile = { 
  name: string 
  address: string 
}