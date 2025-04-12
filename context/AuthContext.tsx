"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import type { User, AuthContextType, RegisterFormData } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password })
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))

      // Redirect based on role
      if (data.role === "owner") {
        router.push("/dashboard")
      } else {
        router.push("/browse")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterFormData) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData)
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))

      // Redirect based on role
      if (data.role === "owner") {
        router.push("/dashboard")
      } else {
        router.push("/browse")
      }
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
