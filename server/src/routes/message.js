const express = require("express");
const Message = require("../models/message");
const Conversation = require("../models/conversation");

const router = express.Router();

//add
router.post("/users/messages", async (req, res) => {
  const { members } = await Conversation.findById(req.body.conversationId);
  const data = { ...req.body, members };
  const newMessage = new Message(data);
  await newMessage.save();
  res.status(201).send(newMessage);
});

//get
router.get("/users/messages/:conversationId", async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.conversationId,
  });

  res.status(201).send(messages);
});

module.exports = router;
