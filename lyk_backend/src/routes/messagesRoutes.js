import { Router } from "express";
import { MessageController } from "../controllers/messageController.js";
import { validateData } from "../middleware/validationMiddleware.js";
import { createMessageSchema } from "../schemas/messageSchema.js";

const router = Router();

router.get("/", MessageController.getAllMessages);
router.get("/:id", MessageController.getMessageById);
router.post(
  "/",
  validateData(createMessageSchema),
  MessageController.createMessage,
);
router.delete("/:id", MessageController.deleteMessage);

export default router;
