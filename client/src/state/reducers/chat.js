import { Types } from "../actions/chat";

const initialState = {
  conversation: null,
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CONVERSATION:
      return { ...state, conversation: action.payload };
    case Types.MESSAGES_SUCCES:
      return { ...state, messages: action.payload };

    case Types.CREATE_MESSAGE_SUCCES:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    case Types.RECEIVE_MESSAGE: {
      if (action.payload.conversationId === state.conversation?._id) {
        return {
          ...state,
          messages: state.messages.concat(action.payload),
        };
      }
      return state;
    }
    case "UPDATE_CHAT":
      return {
        ...state,
        conversation: { ...state.conversation, members: action.payload },
      };
    case "DELETE_CHAT":
      return initialState;
    case "STOP_CHAT":
      return initialState;
    default:
      return state;
  }
};

export default chatReducer;
