import { Types } from '../actions/socket';

const initialState = {
  onlineUsers: [],
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ONLINE_USERS:
      return { ...state, onlineUsers: action.payload };
    case 'DELETE_SOCKET':
      return initialState;
    default:
      return state;
  }
};

export default socketReducer;
