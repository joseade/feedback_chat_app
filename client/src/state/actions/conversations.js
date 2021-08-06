export const Types = {
  CONVERSATIONS_REQUEST: "CONVERSATIONS_REQUEST",
  CONVERSATIONS_SUCCES: "CONVERSATIONS_SUCCES",
  CONVERSATIONS_ERROR: "CONVERSATIONS_ERROR",
  CREATE_CONVERSATION_REQUEST: "CREATE_CONVERSATION_REQUEST",
  CREATE_CONVERSATION_SUCCES: "CREATE_CONVERSATION_SUCCES",
  SEND_CONVERSATION: "SEND_CONVERSATION",
  RECEIVE_CONVERSATION: "RECEIVE_CONVERSATION",
  ADD_FRIEND_TO_CONVERSATION_REQUEST: "ADD_FRIEND_TO_CONVERSATION_REQUEST",
  ADD_FRIEND_TO_CONVERSATION_SUCCES: "ADD_FRIEND_TO_CONVERSATION_SUCCES",
  DELETE_FRIEND_FROM_CONVERSATION_REQUEST:
    "DELETE_FRIEND_FROM_CONVERSATION_REQUEST",
  DELETE_FRIEND_FROM_CONVERSATION_SUCCES:
    "DELETE_FRIEND_FROM_CONVERSATION_SUCCES",
  USER_QUITS_CONVERSATION_REQUEST: "USER_QUITS_CONVERSATION_REQUEST",
  USER_QUITS_CONVERSATION_SUCCES: "USER_QUITS_CONVERSATION_SUCCES",
};

export const userQuitsConversation = (conversationId, removedUserId) => ({
  type: Types.USER_QUITS_CONVERSATION_REQUEST,
  payload: {
    conversationId,
    removedUserId,
  },
  meta: {
    method: "POST",
    url: `/users/conversations/deleteuser`,
    succes: Types.USER_QUITS_CONVERSATION_SUCCES,
  },
});

export const deleteFriendFromConversation = (
  conversationId,
  removedUserId
) => ({
  type: Types.DELETE_FRIEND_FROM_CONVERSATION_REQUEST,
  payload: {
    conversationId,
    removedUserId,
  },
  meta: {
    method: "POST",
    url: `/users/conversations/deleteuser`,
    succes: Types.DELETE_FRIEND_FROM_CONVERSATION_SUCCES,
  },
});

export const addFriendToConversation = (conversationId, newUserId) => ({
  type: Types.ADD_FRIEND_TO_CONVERSATION_REQUEST,
  payload: {
    conversationId,
    newUserId,
  },
  meta: {
    method: "POST",
    url: `/users/conversations/adduser`,
    succes: Types.ADD_FRIEND_TO_CONVERSATION_SUCCES,
  },
});

export const conversationsRequest = (user) => ({
  type: Types.CONVERSATIONS_REQUEST,
  payload: user,
  meta: {
    method: "GET",
    url: `/users/conversations/${user.id}`,
    succes: Types.CONVERSATIONS_SUCCES,
    error: Types.CONVERSATIONS_ERROR,
  },
});

export const createConversation = (senderId, receiverId) => ({
  type: Types.CREATE_CONVERSATION_REQUEST,
  payload: { senderId, receiverId },
  meta: {
    method: "POST",
    url: "/users/conversations",
    succes: Types.CREATE_CONVERSATION_SUCCES,
  },
});

export const sendConversation = (sender, receiver, conversation) => ({
  type: "mess",
  payload: {
    type: Types.SEND_CONVERSATION,
    sender,
    receiver,
    conversation,
  },
});

export const receiveConversation = (conversation) => ({
  type: Types.RECEIVE_CONVERSATION,
  payload: conversation,
});
