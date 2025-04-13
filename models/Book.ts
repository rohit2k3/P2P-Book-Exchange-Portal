import mongoose, { type Document, Schema } from "mongoose"

export interface IBook extends Document {
  title: string
  author: string
  genre?: string
  location: string
  contact: string
  status: "available" | "rented" | "exchanged"
  bookCover: string
  ownerId: mongoose.Types.ObjectId
  description?: string
  publishYear?: number
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Contact information is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "rented", "exchanged"],
      default: "available",
    },
    bookCover: {
      type: String,
      required: [true, "Book cover image is required"],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner ID is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    publishYear: {
      type: Number,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IBook>("Book", BookSchema)
