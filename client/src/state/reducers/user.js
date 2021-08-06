import { Types } from "../actions/user";

const initialState = {
  id: "",
  name: "",
  email: "",
  profilePicture: "",
  followers: [],
  followings: [],
  friends: [],
  signup: false,
  signin: false,
  signout: false,
  searchUser: "",
  errors: [],
  language: null,
};

const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.REGISTER_USER_SUCCES:
      return { ...state, signup: true, errors: [] };
    case Types.REGISTER_USER_ERROR:
      return { ...state, signup: false, errors: action.payload };
    case Types.LOGIN_USER_SUCCES:
      const { followers, followings } = action.payload;
      const friends = followers.filter((follower) => {
        return followings.some((f) => f.id === follower.id);
      });

      return {
        ...state,
        ...action.payload,
        friends,
        signin: true,
        errors: [],
      };
    case Types.LOGIN_USER_ERROR:
      return { ...state, signup: false, signin: false, errors: action.payload };
    case Types.SEARCH_USER_SUCCES:
      return { ...state, searchUser: action.payload };
    case Types.SEARCH_USER_ERROR:
      return { ...state, searchUser: "", errors: action.payload };
    case Types.FOLLOW_USER_SUCCES:
      const friend = state.followers.filter((follower) => {
        return follower.id === action.payload.id;
      });
      if (friend.length > 0) {
        return {
          ...state,
          searchUser: "",
          friends: state.friends.concat(friend),
          followings: state.followings.concat(action.payload),
        };
      }

      return {
        ...state,
        searchUser: "",
        followings: state.followings.concat(action.payload),
      };

    case Types.FOLLOW_USER_ERROR:
      return { ...state, searchUser: "", errors: action.payload };
    case Types.RECEIVE_FOLLOWER:
      const f = state.followings.filter((following) => {
        return following.id === action.payload.id;
      });
      if (f.length > 0) {
        return {
          ...state,
          friends: state.friends.concat(f),
          followers: state.followers.concat(action.payload),
        };
      }
      return {
        ...state,
        followers: state.followers.concat(action.payload),
      };

    case Types.UPDATE_AVATAR_SUCCES:
      return { ...state, profilePicture: action.payload.profilePicture };

    case "BACK_TO_REGISTER":
      return initialState;

    case "CHANGE_LANGUAGE":
      return { ...state, language: action.payload };

    case Types.UPDATE_LANGUAGE_SUCCES:
      return { ...state, language: action.payload.language };

    case "DELETE_ERRORS":
      return { ...state, errors: [] };

    case Types.LOGOUT_USER_SUCCES:
      return initialState;

    case "STOP_USER":
      return initialState;

    default:
      return state;
  }
};

export default registerUserReducer;
