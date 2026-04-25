import express from "express";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { getContacts } from "../controllers/message.controller";

const router = express.Router();

router.get("/contacts", asyncHandler(getContacts));
// router.get("/chats", asyncHandler(getAllContacts));
// router.get("/:id", asyncHandler(getAllContacts));

// router.post("/send", asyncHandler(sendMessage));

export default router;
