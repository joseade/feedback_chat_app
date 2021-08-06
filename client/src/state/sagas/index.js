import userSagas from "./user";
import socketSagas from "./socket";
import conversationsSagas from "./conversations";
import chatSagas from "./chat";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...socketSagas,
    ...conversationsSagas,
    ...chatSagas,
  ]);
}
