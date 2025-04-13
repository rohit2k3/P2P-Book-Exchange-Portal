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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)



  return (
    <nav className="bg-white dark:bg-dark-900 text-dark-900 dark:text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <FaBook className="text-primary-500 dark:text-accent-400" />
            <span>BookSwap</span>
          </Link>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleMenu} className="p-2 focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-accent-500 dark:text-accent-300">Hello, {user.name}</span>
                {user.role === "owner" ? (
                  <Link href="/dashboard" className="flex items-center space-x-1 hover:text-primary-500 transition-colors">
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link href="/browse" className="flex items-center space-x-1 hover:text-primary-500 transition-colors">
                    <FaSearch />
                    <span>Browse Books</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-primary-500 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center space-x-1 hover:text-primary-500 transition-colors">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors text-white"
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
                <div className="text-accent-500 dark:text-accent-300 py-2 border-b border-primary-700">Hello, {user.name}</div>
                {user.role === "owner" ? (
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className=" py-2 flex items-center space-x-2 hover:text-primary-500 transition-colors">
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link href="/browse" onClick={() => setIsMenuOpen(false)} className=" py-2 flex items-center space-x-2 hover:text-primary-500 transition-colors">
                    <FaSearch />
                    <span>Browse Books</span>
                  </Link>
                )}
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className=" w-full text-left py-2 flex items-center space-x-2 hover:text-primary-500 transition-colors">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className=" py-2 flex items-center space-x-2 hover:text-primary-500 transition-colors">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className=" py-2 flex items-center space-x-2 hover:text-primary-500 transition-colors">
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