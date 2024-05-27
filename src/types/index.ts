
export type Product = {
  productID: string
  productName: string
  image: []
  price: number
  description: string
  quantity: number
  categoryID: string 
  categories: Category[]
  createdAt: string
}

export type Category = { 
  categoryID: string
  name: string
  description: string
  products: Product[]
  sold: number
  shipping: number
  createdAt: string

}

export type CategoryState = {
  categories: Category[]
  totalPages: number 
  category: Category | null
  error: null | string
  isLoading: boolean
}

export type ProductState = {
  products: []
  totalPages: number 
  product: Product | null
  error: null | string
  isLoading: boolean
}


export type CartState = {
 cartItems: Product[]
}


export type User = {
  userID?: string
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
  users: User[]
  totalPages: number
  error: null | string
  isLoading: boolean
  userData: User | null
  isLoggedIn: boolean 
  isAdmin: boolean
  token: null | string

  
}
export type LoginFormData = {
  email: string
  password: string
  allowExtraEmails: boolean
}

export type LoginData = {
  isLoggedIn: boolean
  userData: User | null 
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
  firstName: string 
  lastName: string
  address: string 
}

//category creation type

export type CreateCategoryFormData = {
  name: string 
  description: string 

}

export type CreateProductFormData = { 
  productID: string
  productName: string 
  price: number 
  description: string 
  categoryID: string 
  quantity: number 


}

export type Order = { 
  orderId: string;
  userId: string;
  status: string;
  paymentMethod: number;
  amount: number;
  products: Product[];
}

export type OrderState = { 
  orders: Order[];
  orderDetails: Order | null;
  isLoading: boolean;
  error: string | null;

}
