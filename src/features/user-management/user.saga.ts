import {
  ListParamsCreateUser,
  ListParamsUpdateUser,
  ListParamsUser,
} from "./../../models/user.model";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import {
  LoginCredentials,
  createUser,
  deactivateUser,
  deleteUser,
  fetchProfile,
  getAllUsers,
  login,
  updateUser,
} from "../../constants/userApi";
import { userActions } from "./user.slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* loginSaga(
  action: PayloadAction<LoginCredentials>
): Generator<any, any, any> {
  try {
    const response = yield call(login, action.payload);
    const { data } = response;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    yield fork(fetchProfileSaga);
    yield put(userActions.login);
  } catch (error) {
    yield put(userActions.loginFailed());
  }
}

function* fetchProfileSaga(): Generator<any, any, any> {
  try {
    const response = yield call(fetchProfile);
    const { data } = response;
    yield put(
      userActions.setCredentials({
        userId: data.userId,
        email: data.email,
        role: data.role,
        name: data.name,
        status: data.status,
        // phone: data.phone,
      })
    );
  } catch (error: any) {
    console.log("Fetch profile error", error);
  }
}

function* logoutSaga(): Generator<any, any, any> {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("auth");
}

function* fetchAllUsersSaga(
  action: PayloadAction<ListParamsUser>
): Generator<any, any, any> {
  try {
    const response = yield call(getAllUsers, action.payload);
    yield put(
      userActions.fetchAllUsers({
        data: response.users,
        currentPage: response.currentPage,
        totalPage: response.totalPages,
      })
    );
  } catch (error) {
    console.log("Fetch all users error", error);
  }
}

function* createUserSaga(
  action: PayloadAction<ListParamsCreateUser>
): Generator<any, any, any> {
  try {
    const response = yield call(createUser, action.payload);
    yield put(userActions.createUser);
    yield put(
      userActions.setStatusUserAction({
        isSuccess: true,
        userId: response.data.userId,
      })
    );
    console.log("Create user success", response);
  } catch (error) {
    yield put(
      userActions.setStatusUserAction({
        isSuccess: false,
      })
    );
    console.log("Create user error", error);
  }
}

function* updateUserSaga(
  action: PayloadAction<ListParamsUpdateUser>
): Generator<any, any, any> {
  try {
    const response = yield call(updateUser, action.payload);
    yield put(
      userActions.setStatusUserAction({
        isSuccess: true,
        userId: response.data.userId,
      })
    );
    console.log("Update user success", response);
  } catch (error) {
    yield put(
      userActions.setStatusUserAction({
        isSuccess: false,
      })
    );
    console.log("Create user error", error);
  }
}

function* deactivateUserSaga(
  action: PayloadAction<string>
): Generator<any, any, any> {
  try {
    const response = yield call(deactivateUser, action.payload);
    console.log("De-activate user success", response);
  } catch (error) {
    console.log("Create user error", error);
  }
}

function* deleteUserSaga(
  action: PayloadAction<string>
): Generator<any, any, any> {
  try {
    const response = yield call(deleteUser, action.payload);
    console.log("Delete user success", response);
  } catch (error) {
    console.log("Create user error", error);
  }
}
export default function* userSaga() {
  yield takeLatest(userActions.login, loginSaga);
  yield takeLatest(userActions.fetchProfile, fetchProfileSaga);
  yield takeLatest(userActions.checkGetAllUsers, fetchAllUsersSaga);
  yield takeLatest(userActions.createUser, createUserSaga);
  yield takeLatest(userActions.updateUser, updateUserSaga);
  yield takeLatest(userActions.deactivateUser, deactivateUserSaga);
  yield takeLatest(userActions.deleteUser, deleteUserSaga);
  yield takeLatest(userActions.logout, logoutSaga);
}
