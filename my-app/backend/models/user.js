import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phno: String,
  age: Number,
  gender: String,
  pass: String,    
  usern: String
})
export default mongoose.model("User",userSchema);