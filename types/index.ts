export interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: "owner" | "seeker"
}

export interface Book {
  _id: string
  title: string
  author: string
  genre?: string
  location: string
  contact: string
  status: "available" | "rented" | "exchanged"
  bookCover: string
  ownerId: {
    _id: string
    name: string
    email: string
    phone: string
  }
  description?: string
  publishYear?: number
  createdAt: string
  updatedAt: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterFormData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  phone: string
  role: "owner" | "seeker"
}

export interface LoginFormData {
  email: string
  password: string
}

export interface BookFormData {
  title: string
  author: string
  genre?: string
  location: string
  contact: string
  description?: string
  publishYear?: number
  bookCover?: File
}

export interface FilterOptions {
  genre?: string
  location?: string
  status?: "available" | "rented" | "exchanged"
}
