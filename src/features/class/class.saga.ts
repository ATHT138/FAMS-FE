import { call, put, takeLatest } from "redux-saga/effects";
import { classActions } from "./class.slice";
import {
  Class,
  ListParamsClass,
  ListParamsClassCreate,
  ListResponseItem,
} from "../../models";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createClass,
  deActiveClass,
  getAllClass,
  getClassById,
  updateClass,
} from "../../constants";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

function* fetchClassListSaga(
  action: PayloadAction<ListParamsClass>
): Generator<any, void, any> {
  try {
    // Call API to fetch class list
    const response: ListResponseItem<Class> = yield call(
      getAllClass,
      action.payload
    );
    console.log("Class list response", response);

    yield put(
      classActions.fetchClassList({
        items: response.items,
        currentPage: response.currentPage,
        totalPage: response.totalPage,
      })
    );

    console.log("Fetch class list successfully", response);
  } catch (error) {
    console.log("Failed to fetch class list", error);
  }
}

function* fetchClassSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    // Call API to fetch class
    const response: Class = yield call(getClassById, action.payload);

    yield put(classActions.fetchClass(response));
    console.log("Fetch class list successfully");
  } catch (error) {
    console.log("Failed to fetch class", error);
  }
}

function* createClassSaga(action: PayloadAction<ListParamsClassCreate>) {
  try {
    const response : AxiosResponse = yield call(createClass, action.payload);
    // console.log("Create class response", response);
    yield put(
      classActions.setStatusClass({
        isSuccessful: true,
        classId: response.data.classId,
      })
    );
    console.log("Create class successfully");
  } catch (error) {
    console.log("Failed to create class", error);
    yield put(
      classActions.setStatusClass({ isSuccessful: false, classId: "" })
    );
  }
}

function* updateClassSaga(
  action: PayloadAction<{ params: ListParamsClassCreate; classId: string }>
) {
  try {
    yield call(updateClass, action.payload.classId, action.payload.params);
    yield put(
      classActions.setStatusClass({
        isSuccessful: true,
        classId: action.payload.classId,
      })
    );
  } catch (error) {
    yield put(classActions.setStatusClass({ isSuccessful: false }));
  }
}

function* deActiveClassSaga(action: PayloadAction<string>) {
  try {
    // Call API to deactivate class
    yield call(deActiveClass, action.payload);
    // yield put(classActions.fetchClass(response));
    console.log("Deactivate class successfully");
  } catch (error) {
    console.log("Failed to deactivate class", error);
    toast.error("Failed to deactivate class");
  }
}

export default function* classSaga() {
  yield takeLatest(classActions.checkLoading, fetchClassListSaga);
  yield takeLatest(classActions.checkClass, fetchClassSaga);
  yield takeLatest(classActions.createClass, createClassSaga);
  yield takeLatest(classActions.updateClass, updateClassSaga);
  yield takeLatest(classActions.setDeActiveClass, deActiveClassSaga);
}
