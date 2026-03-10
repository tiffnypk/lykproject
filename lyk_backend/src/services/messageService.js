import ERROR_MESSAGES from "../constants/errorMessages.js";
import { MessageModel } from "../models/messageModel.js";
import CustomError from "../utils/customError.js";

export const MessageService = {
  async getAllMessages() {
    // Fetch All Messages
    return MessageModel.getAll();
  },

  async getMessageById(messageId) {
    // Fetch Message By Id
    const message = await MessageModel.findById(messageId);
    if (!message) {
      throw new CustomError(ERROR_MESSAGES.MESSAGE_NOT_FOUND, 404);
    }
    return message;
  },

  async createMessage(newMessage) {
    // Create Message
    const { recipient_name, content, sender_id } = newMessage;

    const sanitizedMessage = {
      recipient_name: recipient_name.trim(),
      content: content.trim(),
      sender_id,
    };

    const createdMessage = await MessageModel.create(sanitizedMessage);
    return createdMessage;
  },

  async deleteMessage(messageId) {
    // Delete Message
    const authenticatedUserId = 3;

    const message = await MessageModel.findById(messageId);

    if (!message) {
      throw new CustomError(ERROR_MESSAGES.MESSAGE_NOT_FOUND, 404);
    }

    if (message.sender_id !== authenticatedUserId) {
      throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);
    }

    const rowCount = await MessageModel.delete(messageId);

    if (rowCount === 0) {
      throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
    return { message: "Message deleted successfully" };
  },
};
