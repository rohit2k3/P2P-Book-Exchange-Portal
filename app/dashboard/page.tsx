"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import BookForm from "@/components/BookForm"
import BookCard from "@/components/BookCard"
import type { Book } from "@/types"
import { FaPlus, FaTimes, FaBook, FaExchangeAlt, FaBookOpen } from "react-icons/fa"

export default function Dashboard() {
  const { user, isLoading } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [isAddingBook, setIsAddingBook] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [fetchingBooks, setFetchingBooks] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    rented: 0,
    exchanged: 0,
  })
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

  useEffect(() => {
    // Redirect if not logged in or not an owner
    if (!isLoading && (!user || user.role !== "owner")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Fetch books owned by the current user
    const fetchBooks = async () => {
      if (!user) return

      try {
        setFetchingBooks(true)
        const { data } = await axios.get(`${API_URL}/books/owner/${user._id}`)
        setBooks(data)

        // Calculate stats
        const stats = {
          total: data.length,
          available: data.filter((book: Book) => book.status === "available").length,
          rented: data.filter((book: Book) => book.status === "rented").length,
          exchanged: data.filter((book: Book) => book.status === "exchanged").length,
        }
        setStats(stats)
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        setFetchingBooks(false)
      }
    }

    if (user) {
      fetchBooks()
    }
  }, [user, API_URL])

  const handleAddBook = async (formData: FormData) => {
    try {
      if (!user) return

      // Add owner ID to form data
      formData.append("ownerId", user._id)

      const { data } = await axios.post(`${API_URL}/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setBooks((prev) => [data, ...prev])
      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        available: prev.available + 1,
      }))
      setIsAddingBook(false)
    } catch (error) {
      console.error("Error adding book:", error)
    }
  }

  const handleUpdateBook = async (formData: FormData) => {
    try {
      if (!editingBook) return

      const { data } = await axios.put(`${API_URL}/books/${editingBook._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setBooks((prev) => prev.map((book) => (book._id === data._id ? data : book)))
      setEditingBook(null)
    } catch (error) {
      console.error("Error updating book:", error)
    }
  }

  const handleStatusChange = async (id: string, status: "available" | "rented" | "exchanged") => {
    try {
      const { data } = await axios.put(`${API_URL}/books/${id}/status`, { status })

      // Update books array
      setBooks((prev) => prev.map((book) => (book._id === id ? { ...book, status: data.status } : book)))

      // Update stats
      const updatedBook = books.find((book) => book._id === id)
      if (updatedBook) {
        setStats((prev) => {
          const newStats = { ...prev }
          // Decrement previous status count
          if (updatedBook.status === "available") newStats.available--
          else if (updatedBook.status === "rented") newStats.rented--
          else if (updatedBook.status === "exchanged") newStats.exchanged--

          // Increment new status count
          if (status === "available") newStats.available++
          else if (status === "rented") newStats.rented++
          else if (status === "exchanged") newStats.exchanged++

          return newStats
        })
      }
    } catch (error) {
      console.error("Error updating book status:", error)
    }
  }

  const handleDeleteBook = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_URL}/books/${id}`)

        // Find the book to get its status before removing
        const bookToDelete = books.find((book) => book._id === id)

        // Update books array
        setBooks((prev) => prev.filter((book) => book._id !== id))

        // Update stats
        if (bookToDelete) {
          setStats((prev) => {
            const newStats = { ...prev }
            newStats.total--

            if (bookToDelete.status === "available") newStats.available--
            else if (bookToDelete.status === "rented") newStats.rented--
            else if (bookToDelete.status === "exchanged") newStats.exchanged--

            return newStats
          })
        }
      } catch (error) {
        console.error("Error deleting book:", error)
      }
    }
  }

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-200">Your Book Listings</h1>
          <p className="text-dark-400 mt-1">Manage your books and track their status</p>
        </div>

        {!isAddingBook && !editingBook && (
          <button onClick={() => setIsAddingBook(true)} className="btn bg-dark-800 dark:bg-dark-100 text-dark-50 dark:text-dark-800 rounded-lg mt-4 md:mt-0 flex items-center p-2">
            <FaPlus className="mr-2" /> Add New Book
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-primary-100 p-3 rounded-full mr-4">
            <FaBook className="text-primary-600 text-xl" />
          </div>
          <div>
            <p className="text-dark-600 text-sm">Total Books</p>
            <p className="text-2xl font-bold text-dark-900">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <FaBookOpen className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-dark-600 text-sm">Available</p>
            <p className="text-2xl font-bold text-green-600">{stats.available}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <FaBook className="text-amber-600 text-xl" />
          </div>
          <div>
            <p className="text-dark-600 text-sm">Rented</p>
            <p className="text-2xl font-bold text-amber-600">{stats.rented}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <FaExchangeAlt className="text-red-600 text-xl" />
          </div>
          <div>
            <p className="text-dark-600 text-sm">Exchanged</p>
            <p className="text-2xl font-bold text-red-600">{stats.exchanged}</p>
          </div>
        </div>
      </div>

      {isAddingBook && (
        <div className="mb-8 bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Add New Book</h2>
            <button
              onClick={() => setIsAddingBook(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-6">
            <BookForm onSubmit={handleAddBook} buttonText="Add Book" />
          </div>
        </div>
      )}

      {editingBook && (
        <div className="mb-8 bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Book</h2>
            <button
              onClick={() => setEditingBook(null)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-6">
            <BookForm
              initialData={{
                title: editingBook.title,
                author: editingBook.author,
                genre: editingBook.genre,
                location: editingBook.location,
                contact: editingBook.contact,
                description: editingBook.description,
                publishYear: editingBook.publishYear,
                // bookCover: editingBook.bookCover,
              }}
              onSubmit={handleUpdateBook}
              buttonText="Update Book"
            />
          </div>
        </div>
      )}

      {fetchingBooks ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-dark-600">Loading your books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft">
          <FaBook className="text-primary-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-800 mb-2">No Books Yet</h3>
          <p className="text-dark-600 mb-6">You haven&apos;t added any books to your collection.</p>
          {!isAddingBook && (
            <button onClick={() => setIsAddingBook(true)} className="btn btn-primary">
              Add Your First Book
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onStatusChange={handleStatusChange}
              onEdit={setEditingBook}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}
    </div>
  )
}
