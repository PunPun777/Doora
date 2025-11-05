import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User, { IUser } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// 🩵 Local StringValue type since @types/jsonwebtoken lacks it
type StringValue = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;

/**
 * ✅ Generate JWT Token
 */
const generateToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as unknown as StringValue,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: IUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = generateToken({ id: newUser._id, role: newUser.role });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   POST /auth/login
 * @desc    Login user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route   PUT /auth/role
 * @desc    Switch user role
 */
export const switchRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, newRole } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.role = newRole;
    await user.save();

    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({
      message: "Role updated successfully",
      token,
      newRole: user.role,
    });
  } catch (err) {
    console.error("Switch Role Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
