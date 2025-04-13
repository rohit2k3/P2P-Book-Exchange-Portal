"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { FaBook, FaExchangeAlt, FaSearch, FaUserPlus } from "react-icons/fa"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "owner") {
        router.push("/dashboard")
      } else {
        router.push("/browse")
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r bg-dark-200 dark:bg-dark-800 text-dark-800 dark:text-dark-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl mb-6">
            Share Books, Share Knowledge
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-dark-100 dark:text-gray-300">
            Connect with book lovers in your community to exchange, borrow, and discover new reads.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded flex items-center justify-center text-lg"
            >
              <FaUserPlus className="mr-2" /> Get Started
            </Link>
            <Link
              href="/browse"
              className="border border-white text-white hover:bg-white/20 px-8 py-3 rounded flex items-center justify-center text-lg"
            >
              <FaSearch className="mr-2" /> Browse Books
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-dark-100 dark:bg-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
            Simple steps to start sharing and discovering books
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-300 flex items-center justify-center mx-auto mb-4">
                <FaUserPlus className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Sign up as a book owner to share your collection or as a seeker to find books.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-300 flex items-center justify-center mx-auto mb-4">
                <FaBook className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">List or Browse</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Add books to your collection or browse available books in your area.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-300 flex items-center justify-center mx-auto mb-4">
                <FaExchangeAlt className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Exchange</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Contact book owners to arrange exchanges, rentals, or borrowing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start sharing?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of book lovers today and discover the joy of sharing knowledge.
          </p>
          <Link
            href="/register"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded text-lg"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  )
}