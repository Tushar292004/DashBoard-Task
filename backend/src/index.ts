import express, {Request, Response} from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User";

const app = express();
app.use(express.json());
app.use(cors({origin: "https://dash-board-task.vercel.app/",}));

//connecting mongodb uri as string
mongoose
.connect(process.env.MONGODB_URI as string)
.then(() => console.log("Conected to database!"));
app.get("/health", async (req: Request, res: Response)=> {
  res.send({message: "Health ok!"})
})


// Get all users
app.get("/dashboard", async (req, res) => {
  const users = await User.find();
  res.json(users);
  console.log(users);
  
});

// Add a user
app.post("/create", async (req, res) => {
  const { name, dob } = req.body;
  const newUser = new User({ name, dob });
  await newUser.save();
  res.status(201).json(newUser);
});

// Edit a user
app.put("/edit/:id", async (req, res) => {
  const { name, dob } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, dob }, { new: true });
  res.json(updatedUser);
});

// Delete a user
app.delete("/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Start the server
app.listen(7000, () => console.log("Server running on port 7000"));
