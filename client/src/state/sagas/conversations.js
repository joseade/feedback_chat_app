import { takeLatest, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/conversations";
import * as api from "../actions/api";

function* apiProcess({ payload, meta }) {
  try {
    const { data } = yield call(api.request, payload, meta);
    yield put(api.succes(meta.succes, data));
    if (meta.succes === actions.Types.CREATE_CONVERSATION_SUCCES) {
      for (const receiver of payload.receiverId) {
        yield put(actions.sendConversation(payload.senderId, receiver, data));
      }
    }

    if (meta.succes === actions.Types.USER_QUITS_CONVERSATION_SUCCES) {
      for (const receiver of data.members) {
        yield put(
          actions.sendConversation(payload.removedUserId, receiver, data)
        );
      }
    }
    if (meta.succes === actions.Types.ADD_FRIEND_TO_CONVERSATION_SUCCES) {
      for (const receiver of data.members) {
        if (receiver !== data.members[0]) {
          yield put(actions.sendConversation(data.members[0], receiver, data));
        }
      }
    }
    if (meta.succes === actions.Types.DELETE_FRIEND_FROM_CONVERSATION_SUCCES) {
      for (const receiver of data.members) {
        if (receiver !== data.members[0]) {
          yield put(actions.sendConversation(data.members[0], receiver, data));
        }
      }
      yield put(
        actions.sendConversation(data.members[0], payload.removedUserId, {
          ...data,
          removedUserId: payload.removedUserId,
        })
      );
    }
  } catch (error) {
    yield put(api.error(meta.error, error.response.data.errors));
  }
}

function* onConversations() {
  yield takeLatest(actions.Types.CONVERSATIONS_REQUEST, apiProcess);
}

function* onNewConversations() {
  yield takeLatest(actions.Types.CREATE_CONVERSATION_REQUEST, apiProcess);
}

function* onAddingFriendToConversations() {
  yield takeLatest(
    actions.Types.ADD_FRIEND_TO_CONVERSATION_REQUEST,
    apiProcess
  );
}

function* onDeletingFriendFromConversations() {
  yield takeLatest(
    actions.Types.DELETE_FRIEND_FROM_CONVERSATION_REQUEST,
    apiProcess
  );
}

function* onQuittingConversations() {
  yield takeLatest(actions.Types.USER_QUITS_CONVERSATION_REQUEST, apiProcess);
}

const conversationsSagas = [
  fork(onConversations),
  fork(onNewConversations),
  fork(onAddingFriendToConversations),
  fork(onDeletingFriendFromConversations),
  fork(onQuittingConversations),
];
export default conversationsSagas;
