import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  phone: string
  role: "owner" | "seeker"
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["owner", "seeker"],
      required: [true, "Role is required"],
    },
  },
  { timestamps: true },
)

export default mongoose.model<IUser>("User", UserSchema)
