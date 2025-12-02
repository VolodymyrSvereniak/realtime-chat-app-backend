import express from "express";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.post("/send", (req, res) => {
  res.send("send message endpoint!");
});

export default router;
