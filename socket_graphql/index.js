const express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require("cors");

const socketio = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
//const io = socketio(server, {
//  cors: {
//    origin: "http://localhost:3000",
//    methods: ["GET", "POST"],
//  },
//});
const PORT = 5000;

app.enable("trust proxy", true);
app.use(cors());

var schema = buildSchema(`
  type User {
    userId: Int
    socketId: Int
    name: String
    profilePicture: String
    email: String
  }

  type Query {
    hello: [User],
    bye: Int 
  }
`);
let users = [];

const addUser = (userId, socketId, name, profilePicture, email) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId, name, profilePicture, email });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const initialUser = [
  {
    userId: 12,
    socketId: 1234,
    name: "a",
    profilePicture: "Im_a",
    email: "a@a.com",
  },
];
var root = {
  hello: () => initialUser,
  bye: () => 3,
};
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Health check endpoint
app.get("/adelino", (req, res) => res.send("Healthy"));

server.listen(PORT, () => {
  console.log(`Server running in por ${PORT}`);
});

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  socket.on("message", (payload) => {
    switch (payload.type) {
      case "ADD_USER": {
        addUser(
          payload.userId,
          socket.id,
          payload.name,
          payload.profilePicture,
          payload.email
        );
        io.emit("message", { type: "GET_USERS", payload: users });
        return;
      }
      case "SEND_FOLLOWER": {
        const { sender, receiver } = payload;
        const user = getUser(receiver.id);
        if (user === undefined) {
          return;
        }
        io.to(user.socketId).emit("message", {
          type: "GET_FOLLOWER",
          payload: sender,
        });
        return;
      }
      case "SEND_CONVERSATION": {
        const { receiver, conversation } = payload;
        const user = getUser(receiver);
        if (user === undefined) {
          return;
        }
        io.to(user.socketId).emit("message", {
          type: "GET_CONVERSATION",
          payload: conversation,
        });

        return;
      }

      case "SEND_MESSAGE": {
        const { receiver, message } = payload;
        const user = getUser(receiver);
        if (user === undefined) {
          return;
        }
        io.to(user.socketId).emit("message", {
          type: "GET_MESSAGE",
          payload: message,
        });

        return;
      }
    }
  });

  //when disconnect
  socket.on("logout", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("message", { type: "GET_USERS", payload: users });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    //io.emit("getUsers", users);
    io.emit("message", { type: "GET_USERS", payload: users });
  });
});
