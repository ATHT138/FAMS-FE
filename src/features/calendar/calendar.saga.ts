import { call, put, takeLatest } from "redux-saga/effects";
import { calendarActions } from "./calendar.slice";
import { Calendar, ListParamsCalendars } from "../../models";
import { getAllCalendar } from "../../constants/calendarApi";
import { PayloadAction } from "@reduxjs/toolkit";

function* getCalendarListSaga(action: PayloadAction<ListParamsCalendars>) {
  try {
    // TODO: fetch calendar list
    const response: Calendar[] = yield call(getAllCalendar, action.payload);

    yield put(calendarActions.setCalendarList(response));
    // console.log("Fetch calendar list successfully", response);
  } catch (error) {
    console.log("Failed to fetch calendar list", error);
  }
}

export function* calendarSaga() {
  yield takeLatest(calendarActions.getCalendarList, getCalendarListSaga);
}
