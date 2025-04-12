"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { FaBook, FaExchangeAlt, FaSearch, FaUserPlus } from "react-icons/fa"
// import Link from "next/link"
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect based on role
        if (user.role === "owner") {
          router.push("/dashboard")
        } else {
          router.push("/browse")
        }
      }
    }
  }, [user, isLoading, router])
  return (
    <div className="min-h-screen bg-dark-50">
    {/* Hero Section */}
    <div className="gradient-bg text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
            Share Books, Share Knowledge
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-accent-100">
            Connect with book lovers in your community to exchange, borrow, and discover new reads.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="btn btn-accent flex items-center justify-center text-lg px-8 py-3">
              <FaUserPlus className="mr-2" /> Get Started
            </Link>
            <Link
              href="/browse"
              className="btn btn-outline bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-lg px-8 py-3"
            >
              <FaSearch className="mr-2" /> Browse Books
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-900">How It Works</h2>
          <p className="mt-4 text-lg text-dark-600">Simple steps to start sharing and discovering books</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4 mx-auto">
              <FaUserPlus className="text-primary-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Create an Account</h3>
            <p className="text-dark-600 text-center">
              Sign up as a book owner to share your collection or as a seeker to find books.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft">
            <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4 mx-auto">
              <FaBook className="text-secondary-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">List or Browse</h3>
            <p className="text-dark-600 text-center">
              Add books to your collection or browse available books in your area.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft">
            <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center mb-4 mx-auto">
              <FaExchangeAlt className="text-accent-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Connect & Exchange</h3>
            <p className="text-dark-600 text-center">
              Contact book owners to arrange exchanges, rentals, or borrowing.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-dark-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start sharing?</h2>
        <p className="text-lg text-dark-300 mb-8 max-w-2xl mx-auto">
          Join our community of book lovers today and discover the joy of sharing knowledge.
        </p>
        <Link href="/register" className="btn btn-accent text-lg px-8 py-3">
          Create Your Account
        </Link>
      </div>
    </div>
  </div>
)
}