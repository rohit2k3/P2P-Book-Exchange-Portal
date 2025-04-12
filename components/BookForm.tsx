"use client"

import type React from "react"

import { useState } from "react"
import { FaUpload, FaBook, FaUser, FaMapMarkerAlt, FaPhone, FaTags } from "react-icons/fa"
import type { BookFormData } from "@/types"

interface BookFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  initialData?: BookFormData
  buttonText?: string
}

const BookForm = ({ onSubmit, initialData, buttonText = "Add Book" }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    genre: initialData?.genre || "",
    location: initialData?.location || "",
    contact: initialData?.contact || "",
    description: initialData?.description || "",
    publishYear: initialData?.publishYear || undefined,
  })
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.bookCover || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image (JPEG, JPG, PNG, GIF, WEBP)")
        return
      }

      setCoverImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Create FormData object for file upload
      const submitData = new FormData()
      submitData.append("title", formData.title)
      submitData.append("author", formData.author)
      if (formData.genre) submitData.append("genre", formData.genre)
      submitData.append("location", formData.location)
      submitData.append("contact", formData.contact)
      if (formData.description) submitData.append("description", formData.description)
      if (formData.publishYear) submitData.append("publishYear", formData.publishYear.toString())

      // Only append file if a new one is selected
      if (coverImage) {
        submitData.append("bookCover", coverImage)
      }

      await onSubmit(submitData)

      // Reset form if it's a new book (no initialData)
      if (!initialData) {
        setFormData({
          title: "",
          author: "",
          genre: "",
          location: "",
          contact: "",
          description: "",
          publishYear: undefined,
        })
        setCoverImage(null)
        setPreviewUrl("")
      }
    } catch (error: any) {
      console.error("Form submission error:", error)
      setError(error.response?.data?.message || "An error occurred while submitting the form")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-soft p-6">
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-700 mb-1 flex items-center">
              <FaBook className="mr-2 text-primary-600" /> Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-dark-700 mb-1 flex items-center">
              <FaUser className="mr-2 text-primary-600" /> Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-dark-700 mb-1 flex items-center">
              <FaTags className="mr-2 text-primary-600" /> Genre (optional)
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="form-input"
              placeholder="E.g., Fiction, Science, History"
            />
          </div>

          <div>
            <label htmlFor="publishYear" className="block text-sm font-medium text-dark-700 mb-1">
              Publish Year (optional)
            </label>
            <input
              type="number"
              id="publishYear"
              name="publishYear"
              value={formData.publishYear || ""}
              onChange={handleChange}
              className="form-input"
              placeholder="E.g., 2020"
              min="1000"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-dark-700 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary-600" /> Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Your city or neighborhood"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-dark-700 mb-1 flex items-center">
              <FaPhone className="mr-2 text-primary-600" /> Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Phone number or email"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-dark-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="form-input"
              placeholder="Brief description of the book"
            ></textarea>
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bookCover" className="block text-sm font-medium text-dark-700 mb-1">
            Book Cover
          </label>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="border-2 border-dashed border-dark-300 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  id="bookCover"
                  name="bookCover"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required={!initialData}
                />
                <label htmlFor="bookCover" className="cursor-pointer flex flex-col items-center">
                  <FaUpload className="text-primary-600 text-2xl mb-2" />
                  <span className="text-dark-600 font-medium">Click to upload book cover</span>
                  <span className="text-dark-400 text-sm mt-1">JPG, PNG, GIF or WEBP (max 5MB)</span>
                </label>
              </div>
            </div>
            {previewUrl && (
              <div className="w-full md:w-1/3">
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden border border-dark-300">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Book cover preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" disabled={isLoading} className="btn btn-primary w-full md:w-auto">
          {isLoading ? "Submitting..." : buttonText}
        </button>
      </div>
    </form>
  )
}

export default BookForm
