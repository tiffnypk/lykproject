import { z } from "zod";

export const messageSchema = z.object({
  id: z.number(),
  sender_id: z.string(),
  recipient_name: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
});

export const createMessageSchema = messageSchema.omit({
  id: true,
  createdAt: true,
});
