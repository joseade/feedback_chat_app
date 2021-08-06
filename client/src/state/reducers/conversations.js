import { Types } from '../actions/conversations';

const initialState = {
  conversations: [],
};

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CONVERSATIONS_SUCCES:
      return { ...state, conversations: action.payload };
    case Types.CREATE_CONVERSATION_SUCCES:
      return {
        ...state,
        conversations: state.conversations.concat(action.payload),
      };
    case Types.RECEIVE_CONVERSATION: {
      if (action.payload?.removedUserId) {
        const filteredConversation = state.conversations.filter(
          (conversation) => conversation._id !== action.payload._id
        );
        return {
          ...state,
          conversations: filteredConversation,
        };
      }
      const filteredConversation = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: filteredConversation.concat(action.payload),
      };
    }
    case Types.ADD_FRIEND_TO_CONVERSATION_SUCCES:
      const filteredConversation = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: filteredConversation.concat(action.payload),
      };
    case Types.DELETE_FRIEND_FROM_CONVERSATION_SUCCES: {
      const filteredConversation = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: filteredConversation.concat(action.payload),
      };
    }
    case Types.USER_QUITS_CONVERSATION_SUCCES: {
      const filteredConversation = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: filteredConversation,
      };
    }
    case 'STOP_CONVERSATIONS':
      return initialState;
    default:
      return state;
  }
};

export default conversationsReducer;
