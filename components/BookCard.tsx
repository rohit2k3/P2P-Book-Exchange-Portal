"use client"
import type { Book } from "@/types"
import { useAuth } from "@/context/AuthContext"
import { FaEdit, FaTrash, FaExchangeAlt } from "react-icons/fa"

interface BookCardProps {
  book: Book
  onStatusChange?: (id: string, status: "available" | "rented" | "exchanged") => void
  onEdit?: (book: Book) => void
  onDelete?: (id: string) => void
}

const BookCard = ({ book, onStatusChange, onEdit, onDelete }: BookCardProps) => {
  const { user } = useAuth()
  const isOwner = user?._id === (typeof book.ownerId === "string" ? book.ownerId : book.ownerId._id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border border-green-200"
      case "rented":
        return "bg-accent-100 text-accent-800 border border-accent-200"
      case "exchanged":
        return "bg-secondary-100 text-secondary-800 border border-secondary-200"
      default:
        return "bg-dark-100 text-dark-800 border border-dark-200"
    }
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-soft bg-white book-card-hover">
      <div className="h-48 overflow-hidden relative">
        <img
          src={book.bookCover || "/placeholder.svg?height=192&width=300"}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
            {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-dark-900 mb-1">{book.title}</h3>
        <p className="text-dark-600 mb-2">by {book.author}</p>
        {book.genre && <p className="text-sm text-dark-500 mb-1">Genre: {book.genre}</p>}
        <p className="text-sm text-dark-500 mb-3">Location: {book.location}</p>

        {isOwner && (
          <div className="mt-4 border-t border-dark-200 pt-4">
            {onStatusChange && (
              <div className="flex items-center mb-3">
                <label htmlFor={`status-${book._id}`} className="text-sm font-medium text-dark-700 mr-2">
                  Status:
                </label>
                <select
                  id={`status-${book._id}`}
                  value={book.status}
                  onChange={(e) => onStatusChange(book._id, e.target.value as "available" | "rented" | "exchanged")}
                  className="text-sm border rounded-md p-1 flex-grow bg-dark-50 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="exchanged">Exchanged</option>
                </select>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(book)}
                  className="px-3 py-1 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700 transition-colors flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(book._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              )}
            </div>
          </div>
        )}

        {!isOwner && (
          <div className="mt-4 border-t border-dark-200 pt-4">
            <button className="w-full py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700 transition-colors flex items-center justify-center">
              <FaExchangeAlt className="mr-2" /> Contact Owner
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookCard
