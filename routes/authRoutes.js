import express from "express";
const router = express.Router();
import AuthController from "../controller/authController.js";

// Public Routes
router.post("/login", AuthController.UserLogin);
router.post("/registration", AuthController.UserRegistration);
export default router;
