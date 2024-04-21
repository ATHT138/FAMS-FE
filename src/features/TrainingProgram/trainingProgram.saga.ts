import { PayloadAction } from "@reduxjs/toolkit";
import {
  GetProgramParam,
  ListParamTrainingProgram,
  ListParamsTrainingProgramStatus,
  ListResponse,
} from "../../models";
import {
  activateOrDeactivate,
  create,
  duplicate,
  getById,
  importTrainingProgramAPI,
  searchSortTrainingProgram,
  update,
} from "../../constants/trainingProgramApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { programActions } from "./trainingProgram.slice";
import {
  CreateTrainingProgram,
  ImportTrainingProgramModel,
  TrainingProgram,
} from "../../models/trainingProgram.model";

function* fetchProgramList(action: PayloadAction<ListParamTrainingProgram>) {
  try {
    const response: ListResponse<TrainingProgram> = yield call(
      searchSortTrainingProgram,
      action.payload
    );
    yield put(
      programActions.fetchListSuccess({
        data: response.data,
        currentPage: response.currentPage,
        totalPage: response.totalPage,
      })
    );
  } catch (error) {
    yield put(programActions.fetchListFail(error as unknown as string));
  }
}
function* fetchProgramById(action: PayloadAction<GetProgramParam>) {
  try {
    const response: TrainingProgram = yield call(
      getById,
      action.payload
    );
    yield put(programActions.fetchProgramIdSuccess(response));
  } catch (error) {
    console.log("Fetch failed: ", error);
    yield put(programActions.fetchProgramIdFail);
  }
}
function* addProgram(action: PayloadAction<CreateTrainingProgram>) {
  try {
    yield put(programActions.setLoading());
    const response: TrainingProgram = yield call(create, action.payload);
    if (response.trainingProgramCode == null) {
      yield put(programActions.fetchCreateFail(response));
    } else yield put(programActions.fetchCreateSuccess(response));
  } catch (error) {
    yield put(programActions.fetchCreateFail(error));
  }
}

function* doFilterSortProgram(action: PayloadAction<ListParamTrainingProgram>) {
  try {
    const response: ListResponse<TrainingProgram> = yield call(
      searchSortTrainingProgram,
      action.payload
    );
    yield put(
      programActions.fetchListSuccess({
        data: response.data,
        currentPage: response.currentPage,
        totalPage: response.totalPage,
      })
    );
  } catch (error) {
    yield put(programActions.fetchListFail(error as unknown as string));
  }
}
function* updateProgram(action: PayloadAction<TrainingProgram>) {
  try {
    console.log("Update program: ", action.payload);
    yield put(programActions.setLoading());
    const response: TrainingProgram = yield call(update, action.payload);
    yield put(programActions.fetchUpdateSuccess(response));
  } catch (error: any) {
    yield put(programActions.fetchUpdateFail(error.toString()));
  }
}
function* changeProgramStatus(
  action: PayloadAction<ListParamsTrainingProgramStatus>
) {
  try {
    yield put(programActions.setLoading());
    yield call(activateOrDeactivate, action.payload);
    yield put(programActions.changeStatusSuccess("Change status successfully"));
  } catch (error: any) {
    yield put(programActions.fetchUpdateFail(error.toString()));
  }
}
function* fetchDuplicate(action: PayloadAction<number>) {
  try {
    yield put(programActions.setLoading());
    const response: TrainingProgram = yield call(duplicate, action.payload);
    yield put(programActions.fetchDuplicateSuccess(response));
  } catch (error: any) {
    yield put(programActions.fetchDuplicateFail(error.toString()));
  }
}

function* importTrainingProgramSaga(
  action: PayloadAction<ImportTrainingProgramModel>
): Generator<any, any, any> {
  try {
    const response = yield call(importTrainingProgramAPI, action.payload);
    console.log("Import training program success");

    console.log(response);
  } catch (error) {
    yield put(programActions.fetchCreateFail(error));
  }
}

export default function* programSaga() {
  yield takeLatest(programActions.fetchList, fetchProgramList);
  yield takeLatest(programActions.fetchProgramById, fetchProgramById);
  yield takeLatest(programActions.fetchCreate, addProgram);
  yield takeLatest(programActions.setFilterSort, doFilterSortProgram);
  yield takeLatest(programActions.fetchUpdate, updateProgram);
  yield takeLatest(programActions.changeStatus, changeProgramStatus);
  yield takeLatest(programActions.fetchDuplicate, fetchDuplicate);
  yield takeLatest(
    programActions.importTrainingProgram,
    importTrainingProgramSaga
  );
}
