import type { Request, Response } from "express"
import fs from "fs"
import Book from "../models/Book"
import cloudinary from "../utils/cloudinary"

// Create a new book listing
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, location, contact, ownerId, description, publishYear } = req.body

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a book cover image" })
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "book_covers",
      transformation: [{ width: 800, height: 1000, crop: "limit" }, { quality: "auto" }],
    })

    // Remove file from local storage after upload
    fs.unlinkSync(req.file.path)

    // Create new book
    const book = new Book({
      title,
      author,
      genre,
      location,
      contact,
      bookCover: result.secure_url,
      ownerId,
      description,
      publishYear: publishYear ? Number.parseInt(publishYear as string) : undefined,
    })

    await book.save()

    res.status(201).json(book)
  } catch (error: any) {
    console.error("Create book error:", error)
    res.status(500).json({
      message: "Server error while creating book",
      error: error.message,
    })
  }
}

// Get all books with optional filters
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { genre, location, status } = req.query


    const filter: any = {}
    if (genre) filter.genre = genre
    if (location) filter.location = location
    if (status) filter.status = status

    const books = await Book.find(filter).populate("ownerId", "name email phone").sort({ createdAt: -1 })
    console.log(books);
    

    res.status(200).json(books)
  } catch (error: any) {
    console.error("Get books error:", error)
    res.status(500).json({
      message: "Server error while fetching books",
      error: error.message,
    })
  }
}

// Get books by owner ID
export const getBooksByOwner = async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params
    const books = await Book.find({ ownerId }).sort({ createdAt: -1 })
    res.status(200).json(books)
  } catch (error: any) {
    console.error("Get books by owner error:", error)
    res.status(500).json({
      message: "Server error while fetching owner's books",
      error: error.message,
    })
  }
}

// Get book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id).populate("ownerId", "name email phone")

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    res.status(200).json(book)
  } catch (error: any) {
    console.error("Get book by ID error:", error)
    res.status(500).json({
      message: "Server error while fetching book",
      error: error.message,
    })
  }
}

// Update book status
export const updateBookStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    book.status = status
    await book.save()

    res.status(200).json(book)
  } catch (error: any) {
    console.error("Update book status error:", error)
    res.status(500).json({
      message: "Server error while updating book status",
      error: error.message,
    })
  }
}

// Update book details
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, author, genre, location, contact, description, publishYear } = req.body

    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    // Update book details
    book.title = title || book.title
    book.author = author || book.author
    book.genre = genre || book.genre
    book.location = location || book.location
    book.contact = contact || book.contact
    book.description = description || book.description

    if (publishYear) {
      book.publishYear = Number.parseInt(publishYear as string)
    }

    // If there's a new image, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "book_covers",
        transformation: [{ width: 800, height: 1000, crop: "limit" }, { quality: "auto" }],
      })

      // Remove file from local storage after upload
      fs.unlinkSync(req.file.path)

      book.bookCover = result.secure_url
    }

    await book.save()
    res.status(200).json(book)
  } catch (error: any) {
    console.error("Update book error:", error)
    res.status(500).json({
      message: "Server error while updating book",
      error: error.message,
    })
  }
}

// Delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    await book.deleteOne()
    res.status(200).json({ message: "Book deleted successfully" })
  } catch (error: any) {
    console.error("Delete book error:", error)
    res.status(500).json({
      message: "Server error while deleting book",
      error: error.message,
    })
  }
}
