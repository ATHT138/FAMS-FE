import {
  createSyllabus,
  duplicateSyllabus,
  importSyllabus,
  updateSyllabus,
} from "./../../constants/syllabusApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { syllabusAcitons } from "./syllabus.slice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  CreateSyllabus,
  ImportSyllabusModel,
  ListParams,
  ListResponse,
  Syllabus,
  SyllabusDetail,
  SyllabusOther,
  SyllabusOutline,
  UpdateSyllabus,
} from "../../models";
import {
  getListSyllabus,
  getSyllabusGeneralById,
  getSyllabusOthersById,
  getSyllabusOutlineById,
} from "../../constants/syllabusApi";

function* fetchSyllabusListSaga(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Syllabus> = yield call(
      getListSyllabus,
      action.payload
    );
    console.log("Fetch syllabus list successfully", response);

    yield put(
      syllabusAcitons.fetchSyllabusListSuccess({
        data: response.data,
        currentPage: response.currentPage,
        totalPage: response.totalPage,
      })
    );
  } catch (error) {
    console.log("Failed to fetch syllabus list", error);
    yield put(syllabusAcitons.fetchSyllabusListFailed());
  }
}

function* fetchSyllabusById(action: PayloadAction<string>) {
  try {
    // Call API to fetch syllabus by id
    const response: SyllabusDetail = yield call(
      getSyllabusGeneralById,
      action.payload
    );

    const responseOutline: SyllabusOutline = yield call(
      getSyllabusOutlineById,
      action.payload
    );

    const responseOther: SyllabusOther = yield call(
      getSyllabusOthersById,
      action.payload
    );

    yield put(syllabusAcitons.fetchSyllabusByIdSuccess(response));
    yield put(syllabusAcitons.fetchSyllabusOutlineById(responseOutline));
    yield put(syllabusAcitons.fetchSyllabusOthersById(responseOther));

    console.log("Fetch syllabus by id successfully", response);
  } catch (error) {
    console.log("Failed to fetch syllabus by id", error);
  }
}

function* duplicateSyllabusSaga(
  action: PayloadAction<string>
): Generator<any, any, any> {
  try {
    const response = yield call(duplicateSyllabus, action.payload);
    console.log("Duplicate syllabus successfully", response);
  } catch (error) {
    console.log("Failed to duplicate syllabus", error);
  }
}
function* importSyllabusSaga(
  action: PayloadAction<ImportSyllabusModel>
): Generator<any, any, any> {
  try {
    const response = yield call(importSyllabus, action.payload);
    console.log("Duplicate syllabus successfully", response);
  } catch (error) {
    console.log("Failed to duplicate syllabus", error);
  }
}

function* createSyllabusSaga(
  action: PayloadAction<CreateSyllabus>
): Generator<any, any, any> {
  try {
    const response = yield call(createSyllabus, action.payload);
    console.log("Create syllabus successfully", response);
    yield put(
      syllabusAcitons.setStatusSyllabus({
        isSuccess: true,
        syllabusId: response.syllabuseId,
      })
    );
  } catch (error) {
    console.log("Failed to create syllabus", error);
    yield put(
      syllabusAcitons.setStatusSyllabus({
        isSuccess: false,
      })
    );
  }
}
function* updateSyllabusSaga(
  action: PayloadAction<UpdateSyllabus>
): Generator<any, any, any> {
  try {
    const response = yield call(updateSyllabus, action.payload);
    console.log("Create syllabus successfully", response);
    yield put(
      syllabusAcitons.setStatusSyllabus({
        isSuccess: true,
        syllabusId: action.payload.syllabuseId,
      })
    );
  } catch (error) {
    console.log("Failed to create syllabus", error);
    yield put(
      syllabusAcitons.setStatusSyllabus({
        isSuccess: false,
      })
    );
  }
}

export default function* syllabusSaga() {
  yield takeLatest(syllabusAcitons.fetchSyllabusList, fetchSyllabusListSaga);
  yield takeLatest(syllabusAcitons.setFilter, fetchSyllabusListSaga);
  yield takeLatest(syllabusAcitons.fetchSyllabusById, fetchSyllabusById);
  yield takeLatest(syllabusAcitons.duplicateSyllabus, duplicateSyllabusSaga);
  yield takeLatest(syllabusAcitons.importSyllabus, importSyllabusSaga);
  yield takeLatest(syllabusAcitons.createSyllabus, createSyllabusSaga);
  yield takeLatest(syllabusAcitons.updateSyllabus, updateSyllabusSaga);
}
