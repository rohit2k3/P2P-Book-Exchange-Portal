import multer from "multer"
import path from "path"
import type { Request, Express } from "express"

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`)
  },
})

// Check file type
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif|webp/
  const mimetype = filetypes.test(file.mimetype)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  if (mimetype && extname) {
    return cb(null, true)
  }
  cb(new Error("Error: Images Only! Supported formats: JPEG, JPG, PNG, GIF, WEBP"))
}

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB max file size
  fileFilter,
})

export default upload
