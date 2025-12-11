import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret=process.env.JWT_SECRET || "dev_secret_replace_me";

export async function handlesignup(req, res) {
  try {
    const { fname, lname, email, phno, age, gender, pass, usern } = req.body;

    
    const existingUser = await User.findOne({ usern });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    
    const hashedpass = await bcrypt.hash(pass, 10);

    
    const newUser = new User({
      fname,
      lname,
      email,
      phno,
      age,
      gender,
      usern,
      pass: hashedpass,
    });

    await newUser.save();
    res.status(201).send("User registered successfully");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error during signup");
  }
}



export async function handlelogin(req, res) {
  try {
    const { loginuser, loginpass } = req.body;

const existingUser = await User.findOne({ usern: loginuser });
    if (!existingUser) {
      return res.status(400).send("Invalid username or password");
    }


    const isMatch = await bcrypt.compare(loginpass, existingUser.pass);
    if (!isMatch) {
      return res.status(400).send("Invalid username or password");
    }
    const token=jwt.sign(
      {id:existingUser._id},
      secret,
      {expiresIn:"7d"}
    )

   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7*24*60*60*1000
});

   return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during login");
  }
}
