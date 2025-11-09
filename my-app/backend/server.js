import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));


const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phno: String,
  age: Number,
  gender: String,
  pass: String,
  usern: String
});


const User = mongoose.model("User", userSchema);


app.get("/", (req, res) => {
  res.send("Server is running fine 👍");
});

app.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send("✅ User data saved to MongoDB");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error saving data");
  }
});


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
