import { takeLatest, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/user';
import * as api from '../actions/api';

function* apiProcess({ payload, meta }) {
  try {
    const { data } = yield call(api.request, payload, meta);
    yield put(api.succes(meta.succes, data));
  } catch (error) {
    yield put(api.error(meta.error, error.response.data.errors));
  }
}

function* onSignUp() {
  yield takeLatest(actions.Types.REGISTER_USER_REQUEST, apiProcess);
}

function* onSignIn() {
  yield takeLatest(actions.Types.LOGIN_USER_REQUEST, apiProcess);
}

function* onSignOut() {
  yield takeLatest(actions.Types.LOGOUT_USER_REQUEST, apiProcess);
}

function* onSearchUser() {
  yield takeLatest(actions.Types.SEARCH_USER_REQUEST, apiProcess);
}

function* onFollowUser() {
  yield takeLatest(actions.Types.FOLLOW_USER_REQUEST, apiProcess);
}

function* onUpdatingAvatar() {
  yield takeLatest(actions.Types.UPDATE_AVATAR_REQUEST, apiProcess);
}

function* onUpdatingLanguage() {
  yield takeLatest(actions.Types.UPDATE_LANGUAGE_REQUEST, apiProcess);
}

const userSagas = [
  fork(onSignUp),
  fork(onSignIn),
  fork(onSearchUser),
  fork(onFollowUser),
  fork(onUpdatingAvatar),
  fork(onUpdatingLanguage),
  fork(onSignOut),
];
export default userSagas;
