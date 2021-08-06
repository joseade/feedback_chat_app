import { eventChannel } from "redux-saga";
import * as actions from "../actions/user";
import * as actionsSocket from "../actions/socket";
import * as actionsConversations from "../actions/conversations";
import * as actionsChat from "../actions/chat";

const createSocketChannel = (socket) => {
  return eventChannel((emit) => {
    const message = (event) => {
      switch (event.type) {
        case "GET_USERS":
          return emit(actionsSocket.getOnLineUsers(event.payload));
        case "GET_FOLLOWER":
          return emit(actions.receiveFollower(event.payload));
        case "GET_CONVERSATION":
          return emit(actionsConversations.receiveConversation(event.payload));
        case "GET_MESSAGE":
          return emit(actionsChat.receiveMessage(event.payload));
        default:
          return;
      }
    };

    // const errorHandler = (errorEvent) => {
    //   // create an Error object and put it into the channel
    //   emit(new Error(errorEvent.reason));
    // };

    // setup the subscription
    socket.on("message", message);

    const unsubscribe = () => {
      socket.off("message", message);
    };

    return unsubscribe;
  });
};

export default createSocketChannel;
