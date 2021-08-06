import { io } from "socket.io-client";
import { call, cancel, fork, put, take } from "redux-saga/effects";
import createSocketChannel from "../sockets/index";
import * as actionsSocket from "../actions/socket";

function connect() {
  //const socket = io("http://localhost:5000");

  const socket = io(window.location.origin, {
    path: "/socket/socket.io/",
  });
  return new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

function* read(socket) {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take("mess");
    socket.emit("message", payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    let { payload } = yield take(actionsSocket.Types.START_SOCKET);
    const socket = yield call(connect);
    socket.emit("message", payload);

    const task = yield fork(handleIO, socket);

    let action = yield take("STOP_SOCKET");
    yield cancel(task);
    socket.emit("logout");
  }
}

// export default function* rootSaga() {
//   yield fork(flow);
// }

const socketSagas = [fork(flow)];
export default socketSagas;
