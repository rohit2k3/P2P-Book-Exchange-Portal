import type { Request, Response } from "express"
import User from "../models/User"

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body


    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // In a real app, we would hash this password
      phone,
      role,
    })

    await user.save()

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    })
  }
}

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body


    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    })
  } catch (error: any) {
    console.error("Login error:", error)
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    })
  }
}

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error: any) {
    console.error("Get user profile error:", error)
    res.status(500).json({
      message: "Server error while fetching user profile",
      error: error.message,
    })
  }
}
