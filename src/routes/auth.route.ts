import express from "express";
import { signUp } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/signup", validate(signUpSchema, "body"), asyncHandler(signUp));

router.get("/login", (req, res) => {
  res.send("login endpoint!");
});

router.get("/logout", (req, res) => {
  res.send("logout endpoint!");
});

export default router;
