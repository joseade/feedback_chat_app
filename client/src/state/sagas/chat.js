import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/chat";
import * as api from "../actions/api";

function* apiProcess({ payload, meta }) {
  try {
    const { conversationId, sender, text } = payload;
    const { data } = yield call(api.request, payload, meta);
    yield put(api.succes(meta.succes, data));
    if (meta.succes === actions.Types.CREATE_MESSAGE_SUCCES) {
      for (const member of meta.members) {
        if (sender !== member) {
          yield put(actions.sendMessage(member, data));
        }
      }
    }
  } catch (error) {
    yield put(api.error(meta.error, error.response.data.errors));
  }
}

function* onMessages() {
  yield takeLatest(actions.Types.MESSAGES_REQUEST, apiProcess);
}

function* onNewMessage() {
  yield takeLatest(actions.Types.CREATE_MESSAGE_REQUEST, apiProcess);
}

const chatSagas = [fork(onMessages), fork(onNewMessage)];
export default chatSagas;
