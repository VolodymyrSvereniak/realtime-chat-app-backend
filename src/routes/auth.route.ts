import express from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller";
import { protectedRoute } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpSchema, updateProfileSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/signup", validate(signUpSchema, "body"), asyncHandler(signUp));
router.post("/login", validate(signUpSchema, "body"), asyncHandler(login));
router.post("/logout", asyncHandler(logout));

router.put(
  "/update-profile",
  protectedRoute,
  validate(updateProfileSchema, "body"),
  asyncHandler(updateProfile)
);

export default router;
