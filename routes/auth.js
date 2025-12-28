import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
console.log("Email:", email);
console.log("User:", user);

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid user" });

  // password check demo (bcrypt use pannunga real project)
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role     
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({
    token,
    role: user.role
  });
});

export default router;
