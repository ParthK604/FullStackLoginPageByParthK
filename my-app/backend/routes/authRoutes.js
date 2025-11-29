import express from "express";
import { handlelogin,handlesignup } from "../controller/authController";
const router = express.Router();

router.post("/signup", handlesignup)
router.post("/login", handlelogin)


export default router;
