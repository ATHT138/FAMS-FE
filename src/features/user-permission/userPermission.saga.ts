import { call, put, takeLatest } from "redux-saga/effects";
import { userPermissionActions } from "./userPermission.slice";
import { updateUserPermission, userPermission } from "../../constants/userApi";
import { UserPermissionModel } from "../../models/userPermission.model";
import { PayloadAction } from "@reduxjs/toolkit";
function* fetchPermissionsSaga(): Generator<any, any, any> {
  try {
    const response: UserPermissionModel[] = yield call(userPermission);
    // console.log("Fetch permissions success", response);
    yield put(userPermissionActions.fetchPermissionsSuccess(response));
  } catch (error) {
    // console.log("Fetch permissions error", error);
    yield put(
      userPermissionActions.fetchPermissionsFailed(
        "Fetch Permission Failed" as unknown as string
      )
    );
  }
}

function* updatePermissionsSaga(
  action: PayloadAction<UserPermissionModel[]>
): Generator<any, any, any> {
  try {
    yield call(updateUserPermission, action.payload);
    yield put(userPermissionActions.updatePermisstions([]));
  } catch (error) {
    console.log("Update permissions error", error);
  }
}

export default function* userPermissionSaga() {
  yield takeLatest(
    userPermissionActions.fetchPermisstions,
    fetchPermissionsSaga
  );
  yield takeLatest(
    userPermissionActions.updatePermisstions,
    updatePermissionsSaga
  );
}
