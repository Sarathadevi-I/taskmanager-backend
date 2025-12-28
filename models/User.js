import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["senior", "junior"],
    required: true
  }
});

// 👇 IMPORTANT FIX
export default mongoose.model("User", userSchema, "userroles");
