import { all } from "redux-saga/effects";
import userSaga from "../features/user-management/user.saga";
import syllabusSaga from "../features/syllabus/syllabus.saga";
import classSaga from "../features/class/class.saga";
import { calendarSaga } from "../features/calendar/calendar.saga";
import materialSaga from "../features/TrainingMaterial/trainingMaterial.saga";
import programSaga from "../features/TrainingProgram/trainingProgram.saga";
import userPermissionSaga from "../features/user-permission/userPermission.saga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    syllabusSaga(),
    classSaga(),
    calendarSaga(),
    programSaga(),
    userPermissionSaga(),
    materialSaga(),
  ]);
}
