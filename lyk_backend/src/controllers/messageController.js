import { MessageService } from "../services/messageService.js";

export const MessageController = {
  async getAllMessages(req, res, next) {
    try {
      const message = await MessageService.getAllMessages();
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },

  async getMessageById(req, res, next) {
    try {
      const messageId = parseInt(req.params.id);
      const message = await MessageService.getMessageById(messageId);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },

  async createMessage(req, res, next) {
    try {
      const newMessage = await MessageService.createMessage(req.body);
      console.log("Created Message:", newMessage);
      res.status(200).json(newMessage);
    } catch (error) {
      next(error);
    }
  },

  async deleteMessage(req, res, next) {
    try {
      const messageId = parseInt(req.params.id, 10);
      const message = await MessageService.deleteMessage(messageId);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
};
