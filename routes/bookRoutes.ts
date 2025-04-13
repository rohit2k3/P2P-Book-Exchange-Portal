import express from "express"
import {
  createBook,
  getBooks,
  getBookById,
  getBooksByOwner,
  updateBookStatus,
  updateBook,
  deleteBook,
} from "../controllers/bookController"
import upload from "../utils/multerConfig"

const router = express.Router()

// Create a new book with image upload
router.post("/", upload.single("bookCover"), createBook)

// Get all books with optional filters
router.get("/", getBooks)

// Get book by ID
router.get("/:id", getBookById)

// Get books by owner ID
router.get("/owner/:ownerId", getBooksByOwner)

// Update book status
router.put("/:id/status", updateBookStatus)

// Update book details
router.put("/:id", upload.single("bookCover"), updateBook)

// Delete book
router.delete("/:id", deleteBook)

export default router
