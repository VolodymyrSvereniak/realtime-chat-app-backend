import express from "express";
import { signUp } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { signUpSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/send", validate(signUpSchema, "body"), asyncHandler(signUp));

export default router;
