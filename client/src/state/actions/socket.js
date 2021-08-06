export const Types = {
  START_SOCKET: 'START_SOCKET',
  GET_ONLINE_USERS: 'GET_ONLINE_USERS',
};

export const startSocket = (user) => ({
  type: Types.START_SOCKET,
  payload: {
    type: 'ADD_USER',
    userId: user.id,
    name: user.name,
    profilePicture: user.profilePicture,
    email: user.email,
  },
});

export const getOnLineUsers = (users) => ({
  type: Types.GET_ONLINE_USERS,
  payload: users,
});
