const express = require("express");
const Conversation = require("../models/conversation");

const router = express.Router();

// new conversation
router.post("/users/conversations", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, ...req.body.receiverId],
  });
  await newConversation.save();
  res.status(201).send(newConversation);
});

// get conversation of a user

router.get("/users/conversations/:userId", async (req, res) => {
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] },
  });

  res.status(201).send(conversation);
});

// add user to conversation

router.post("/users/conversations/adduser", async (req, res) => {
  // const conversation = await Conversation.findByIdAndUpdate(
  //   req.body.conversationId,
  //   {
  //     $push: { members: req.body.newUserId },
  //   }
  // );

  const conversation = await Conversation.findById(req.body.conversationId);

  await conversation.updateOne({
    $push: { members: req.body.newUserId },
  });
  const newConversation = await Conversation.findById(req.body.conversationId);

  res.status(200).json(newConversation);
});

// delete user from conversation
router.post("/users/conversations/deleteuser", async (req, res) => {
  const conversation = await Conversation.findById(req.body.conversationId);

  await conversation.updateOne({
    $pull: { members: req.body.removedUserId },
  });

  const newConversation = await Conversation.findById(req.body.conversationId);

  res.status(200).json(newConversation);
});

module.exports = router;
