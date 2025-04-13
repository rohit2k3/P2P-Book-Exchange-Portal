"use client"

import { useState, useEffect } from "react"
import type { FilterOptions } from "@/types"
import axios from "axios"
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa"

interface FilterControlsProps {
  onFilterChange: (filters: FilterOptions) => void
}

interface Book {
  _id: string; // Assuming an ID field exists
  title: string; // Assuming a title field exists
  author: string; // Assuming an author field exists
  genre: string | null | undefined;
  location: string;
  status: 'available' | 'rented' | 'exchanged'; // Assuming status field exists
  // Add other relevant fields based on your actual API response
}

const FilterControls = ({ onFilterChange }: FilterControlsProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    genre: "",
    location: "",
    status: undefined
  })
  const [genres, setGenres] = useState<string[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Fetch unique genres and locations for filter dropdowns
    const fetchFilterOptions = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        const { data } = await axios.get(`${API_URL}/books`)

        // Extract unique genres and locations
        const uniqueGenres = Array.from(new Set(data.map((book: Book) => book.genre).filter(Boolean)))
        const uniqueLocations = Array.from(new Set(data.map((book: Book) => book.location)))

        setGenres(uniqueGenres as string[])
        setLocations(uniqueLocations as string[])
      } catch (error:unknown) {
        console.error("Error fetching filter options:", error)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const updatedFilters = { ...filters, [name]: value }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleReset = () => {
    const resetFilters = { genre: "", location: "", status: undefined }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white rounded-xl shadow-soft m-4 overflow-hidden">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <FaFilter className="text-primary-600 mr-2" />
          <h3 className="font-medium text-dark-800">Filter Books</h3>
        </div>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-dark-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-dark-700 mb-1">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-dark-700 mb-1">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-dark-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status || ""}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="exchanged">Exchanged</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="btn btn-outline mr-2"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterControls
