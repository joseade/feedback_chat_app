import { combineReducers } from "redux";
import user from "./user";
import socket from "./socket";
import conversations from "./conversations";
import chat from "./chat";

export default combineReducers({
  user,
  socket,
  userConversations: conversations,
  chat,
});
