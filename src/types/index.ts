export interface Product {
  productID: string
  productName: string
  description: string
  price: number
  quantity: number
  categoryID: string
  imgUrl: File[] | string[];
  categories?: Category[]
  createdAt: string
}
export interface CreateProductFormData {
  productID: string
  productName: string
  price: number
  description: string
  categoryID: string
  quantity: number
  imgUrl: File[] | string[];

}

export interface CreateProduct {
  productID: string;
  productName: string;
  price: number;
  description: string;
  categoryID: string;
  quantity: number;
  imgUrl: File[] | string[]; // Array of strings for URLs
}

export interface ProductState {
  products: Product[]
  totalPages: number
  product: Product | null
  error: string | null
  isLoading: boolean
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

// export type ProductState = {
//   products: []
//   totalPages: number 
//   product: Product | null
//   error: null | string
//   isLoading: boolean
// }


export type CartState = {
 cartItems: Product[]
}


export type User = {
  paymentMethod?: number;
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
  orders?: Order[];
  
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


//PaymentMethod { CreditCard = 0, ApplePay = 1, Visa = 2, Cash = 3, PayPal = 4 }
//OrderStatus { Creating = 0, Pending = 1, Processing = 2, Shipped = 3, Delivered = 4 }
export type Order = { 
  orderID: string;
  userID: string;
  status?: number;
  paymentMethod?: number;
  amount: number;
  products: Product[];
}

export interface OrderState  { 
  orders: Order[];
  order: Order
  isLoading: boolean;
  error: string | null;

}

export type CreateProductForBackend = {
  imgUrl?: string[]
  productName: string
  price: number
  description: string
  categoryID: string
  quantity: number
}