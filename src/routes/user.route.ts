import { Router } from "express";
import { protectedRoute } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { updateProfileSchema } from "../schemas/user.schema";
import { updateProfilePicture } from "../controllers/user.controller";

const router = Router();

router.put(
  "/update-profile",
  protectedRoute,
  validate(updateProfileSchema, "body"),
  asyncHandler(updateProfilePicture)
);
