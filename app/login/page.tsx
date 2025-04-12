"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import type { LoginFormData } from "@/types"
import { FaSignInAlt } from "react-icons/fa"

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [error, setError] = useState<string>("")
  const { login, isLoading } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(formData.email, formData.password)
      // Redirect is handled in the AuthContext
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="min-h-screen bg-dark-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
            <FaSignInAlt className="text-primary-600 text-2xl" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-dark-900">Welcome back</h2>
          <p className="mt-2 text-center text-sm text-dark-600">Sign in to access your account</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-dark-700">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-700">
                Remember me
              </label>
            </div>

            <div>
              <button type="submit" disabled={isLoading} className="btn btn-primary w-full flex justify-center py-3">
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
