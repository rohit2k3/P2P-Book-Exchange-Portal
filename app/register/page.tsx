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
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
          <FaUserPlus className="text-primary-600 text-2xl" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Join our community of book lovers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-md rounded-lg">
          {error && (
            <div className="mb-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              { label: "Full Name", id: "name", type: "text", placeholder: "Rohit Sharma" },
              { label: "Email address", id: "email", type: "email", placeholder: "you@example.com" },
              { label: "Password", id: "password", type: "password", placeholder: "••••••••" },
              { label: "Phone Number", id: "phone", type: "tel", placeholder: "+91 9874563215" },
            ].map(({ label, id, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  required
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder={placeholder}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { role: "seeker", icon: FaSearch, label: "Find Books" },
                  { role: "owner", icon: FaBook, label: "Share Books" },
                ].map(({ role, icon: Icon, label }) => {
                  const isActive = formData.role === role
                  return (
                    <div
                      key={role}
                      onClick={() => setFormData((prev) => ({ ...prev, role: role as "seeker" | "owner" }))}
                      className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center ${
                        isActive
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900"
                          : "border-gray-300 dark:border-gray-600 hover:border-primary-300"
                      }`}
                    >
                      <Icon className={`text-xl ${isActive ? "text-primary-600" : "text-gray-500 dark:text-gray-300"}`} />
                      <span
                        className={`mt-1 text-sm ${
                          isActive
                            ? "font-medium text-primary-700 dark:text-primary-200"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {label}
                      </span>
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={handleChange}
                        className="sr-only"
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 rounded-md shadow transition"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
