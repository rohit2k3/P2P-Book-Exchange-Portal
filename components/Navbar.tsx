"use client"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import {
  FaBook,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaTachometerAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="gradient-bg text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <FaBook className="text-accent-400" />
            <span>BookSwap</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-accent-200">Hello, {user.name}</span>
                {user.role === "owner" ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-1 hover:text-accent-300 transition-colors"
                  >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link href="/browse" className="flex items-center space-x-1 hover:text-accent-300 transition-colors">
                    <FaSearch />
                    <span>Browse Books</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-accent-300 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center space-x-1 hover:text-accent-300 transition-colors">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {user ? (
              <>
                <div className="text-accent-200 py-2 border-b border-primary-700">Hello, {user.name}</div>
                {user.role === "owner" ? (
                  <Link
                    href="/dashboard"
                    className="block py-2 flex items-center space-x-2 hover:text-accent-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/browse"
                    className="block py-2 flex items-center space-x-2 hover:text-accent-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaSearch />
                    <span>Browse Books</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left py-2 flex items-center space-x-2 hover:text-accent-300 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 flex items-center space-x-2 hover:text-accent-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="block py-2 flex items-center space-x-2 hover:text-accent-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
