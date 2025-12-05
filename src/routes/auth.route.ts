import express from "express";
import { signUp, login, logout } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/signup", validate(signUpSchema, "body"), asyncHandler(signUp));
router.post("/login", validate(signUpSchema, "body"), asyncHandler(login));
router.post("/logout", asyncHandler(logout));

export default router;
