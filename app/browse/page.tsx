"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import FilterControls from "@/components/FilterControls"
import BookCard from "@/components/BookCard"
import type { Book, FilterOptions } from "@/types"
import { FaSearch, FaBookOpen } from "react-icons/fa"

export default function Browse() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    // Fetch all books
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/books`);
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [API_URL]);

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);

        // Build query string from filters
        const queryParams = new URLSearchParams();
        if (filters.genre) queryParams.append("genre", filters.genre);
        if (filters.location) queryParams.append("location", filters.location);
        if (filters.status) queryParams.append("status", filters.status);

        const { data } = await axios.get(`${API_URL}/books?${queryParams.toString()}`);
        
        // Apply search term filter client-side
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const filtered = data.filter((book: Book) => 
            book.title.toLowerCase().includes(term) || 
            book.author.toLowerCase().includes(term) ||
            (book.genre && book.genre.toLowerCase().includes(term))
          );
          setFilteredBooks(filtered);
        } else {
          setFilteredBooks(data);
        }
      } catch (error) {
        console.error("Error applying filters:", error);
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [filters, searchTerm, API_URL]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Browse Available Books</h1>
        <p className="text-dark-600">Find books to borrow or exchange in your community</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, author or genre..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-input pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
        </div>
      </div>

      <FilterControls onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-dark-600">Loading books...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft">
          <FaBookOpen className="text-primary-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-800 mb-2">No Books Found</h3>
          <p className="text-dark-600">
            {searchTerm
              ? `No books match your search for "${searchTerm}".`
              : "No books match your selected filters."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onStatusChange={undefined}
              onEdit={undefined}
              onDelete={undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
