"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import type { RegisterFormData } from "@/types"
import { FaBook, FaSearch, FaUserPlus } from "react-icons/fa"

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "seeker",
  })
  const [error, setError] = useState<string>("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await register(formData)
      // Redirect is handled in the AuthContext
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-dark-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
            <FaUserPlus className="text-primary-600 text-2xl" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-dark-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-dark-600">Join our community of book lovers</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-dark-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-dark-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-dark-700">
                I want to
              </label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div
                  className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center ${
                    formData.role === "seeker"
                      ? "border-primary-500 bg-primary-50"
                      : "border-dark-300 hover:border-primary-300"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, role: "seeker" }))}
                >
                  <FaSearch
                    className={`text-xl ${formData.role === "seeker" ? "text-primary-600" : "text-dark-500"}`}
                  />
                  <span
                    className={`mt-1 ${formData.role === "seeker" ? "font-medium text-primary-700" : "text-dark-700"}`}
                  >
                    Find Books
                  </span>
                  <input
                    type="radio"
                    name="role"
                    value="seeker"
                    checked={formData.role === "seeker"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                </div>
                <div
                  className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center ${
                    formData.role === "owner"
                      ? "border-primary-500 bg-primary-50"
                      : "border-dark-300 hover:border-primary-300"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, role: "owner" }))}
                >
                  <FaBook className={`text-xl ${formData.role === "owner" ? "text-primary-600" : "text-dark-500"}`} />
                  <span
                    className={`mt-1 ${formData.role === "owner" ? "font-medium text-primary-700" : "text-dark-700"}`}
                  >
                    Share Books
                  </span>
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={formData.role === "owner"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                </div>
              </div>
            </div>

            <div>
              <button type="submit" disabled={isLoading} className="btn btn-primary w-full flex justify-center py-3">
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
