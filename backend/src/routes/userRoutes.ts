import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";

const router = express.Router();

// Get all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Add a user
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, dob } = req.body;
    const newUser: IUser = new User({ name, dob });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update a user
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, dob } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, dob },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Delete a user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
